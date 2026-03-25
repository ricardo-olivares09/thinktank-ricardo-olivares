// Color Palette matching the IMEG design system
const colors = {
    Nissan: '#FF204E', // Brand Accent
    GM: '#00224D',     // Brand Primary
    Volkswagen: '#A0153E',
    Stellantis: '#475569',
    KIA: '#94A3B8'
};

// ============================================
// 1. DATA MOCKING (Hiper-realistic Mexican Auto Data 2010-2023)
// ============================================

const years = d3.range(2010, 2024);
const brands = Object.keys(colors);

// Helper for random walks
function generateSeries(start, drift, volatility) {
    let current = start;
    return years.map(y => {
        current = current * (1 + (Math.random() - 0.5) * volatility + drift);
        return { year: y, value: Math.round(current) };
    });
}

// Data: Producción (Bar Chart Race)
// We need an array of { year, name, value, rank }
const rawProduction = {
    Nissan: generateSeries(500000, 0.02, 0.1),
    GM: generateSeries(450000, 0.01, 0.15),
    Volkswagen: generateSeries(400000, -0.01, 0.12),
    Stellantis: generateSeries(350000, 0.0, 0.1),
    KIA: generateSeries(0, 0.3, 0.1).map(d => ({ ...d, value: d.year < 2016 ? 0 : d.value + 150000 })) // KIA entered recently
};

// Flatten and interpolate for smooth Bar Chart Race
// We will generate keyframes (e.g. 10 frames per year)
const productionData = [];
years.forEach(year => {
    brands.forEach(brand => {
        const val = rawProduction[brand].find(d => d.year === year).value;
        productionData.push({ year, brand, value: val });
    });
});

// Data: Comercio Exterior (Line Chart)
// Exports are generally 80-90% of production. Imports are lower.
const tradeData = years.map(year => {
    const totalProd = brands.reduce((sum, b) => sum + rawProduction[b].find(d => d.year === year).value, 0);
    // 2020 pandemic dip simulation
    const pandemicFactor = year === 2020 ? 0.75 : (year === 2021 ? 0.85 : 1);
    
    return {
        year,
        exportacion: Math.round(totalProd * 0.85 * pandemicFactor),
        importacion: Math.round(totalProd * 0.4 * pandemicFactor + (Math.random() * 50000))
    };
});

// Data: Ventas (Streamgraph)
// Format required by d3.stack(): Array of objects { year, Nissan: val, GM: val... }
const salesData = years.map(year => {
    const obj = { year, date: new Date(year, 0, 1) };
    brands.forEach(brand => {
        // Internal sales are a fraction of production, differently distributed
        const prod = rawProduction[brand].find(d => d.year === year).value;
        obj[brand] = Math.round(prod * (0.2 + Math.random() * 0.1));
    });
    return obj;
});


// ============================================
// 2. VISUALIZATION CONTROLLERS
// ============================================

// --- A. Bar Chart Race ---
function renderBarChartRace() {
    const container = document.getElementById('chart-race');
    const width = container.clientWidth;
    const height = container.clientHeight;
    const margin = { top: 20, right: 40, bottom: 20, left: 120 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    container.innerHTML = '';
    const svg = d3.select(container).append('svg')
        .attr('width', width)
        .attr('height', height);

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // Group data by year and rank them
    const dataByYear = d3.group(productionData, d => d.year);
    const keyframes = [];
    
    // Create interpolated frames for smooth transition
    const k = 10; // frames per year
    for (let i = 0; i < years.length - 1; i++) {
        const currentYear = years[i];
        const nextYear = years[i + 1];
        const currentData = dataByYear.get(currentYear);
        const nextData = dataByYear.get(nextYear);
        
        for (let t = 0; t < k; t++) {
            const alpha = t / k;
            const frameYear = currentYear + alpha;
            
            const frameData = brands.map(brand => {
                const startVal = currentData.find(d => d.brand === brand).value;
                const endVal = nextData.find(d => d.brand === brand).value;
                return {
                    brand,
                    value: startVal * (1 - alpha) + endVal * alpha
                };
            });
            
            frameData.sort((a, b) => d3.descending(a.value, b.value));
            frameData.forEach((d, rank) => d.rank = rank);
            keyframes.push({ date: frameYear, data: frameData.slice(0, 5) }); // Top 5
        }
    }
    // Add final year exact frame
    const finalData = dataByYear.get(years[years.length - 1]).map(d => ({...d}));
    finalData.sort((a, b) => d3.descending(a.value, b.value));
    finalData.forEach((d, rank) => d.rank = rank);
    keyframes.push({ date: years[years.length - 1], data: finalData.slice(0, 5) });

    const x = d3.scaleLinear().range([0, innerWidth]);
    const y = d3.scaleBand().domain(d3.range(5)).range([0, innerHeight]).padding(0.1);

    const formatNumber = d3.format(",.0f");

    const xAxis = d3.axisTop(x).ticks(width / 160).tickFormat(d3.format(",.0f")).tickSizeOuter(0).tickSizeInner(-innerHeight);
    const axisG = g.append("g")
        .attr("class", "axis grid")
        .style("transform", "translateY(0px)");

    // Year Label
    const yearLabel = g.append("text")
        .attr("class", "year-label")
        .attr("x", innerWidth - 20)
        .attr("y", innerHeight - 20)
        .attr("text-anchor", "end")
        .style("font-size", "5rem")
        .style("font-weight", "bold")
        .style("font-family", "var(--font-serif)")
        .style("fill", "var(--color-border)"); // very faint

    let currentFrame = 0;
    let ticker;
    const duration = 250; // ms per frame

    function update(frame) {
        const { date, data } = frame;
        x.domain([0, d3.max(data, d => d.value)]);
        axisG.transition().duration(duration).ease(d3.easeLinear).call(xAxis);
        
        yearLabel.text(Math.floor(date));

        const bars = g.selectAll(".bar-group").data(data, d => d.brand);

        const barsEnter = bars.enter().append("g")
            .attr("class", "bar-group")
            .attr("transform", d => `translate(0,${innerHeight})`); // start from bottom

        barsEnter.append("rect")
            .attr("fill", d => colors[d.brand] || '#ccc')
            .attr("width", d => x(d.value))
            .attr("height", y.bandwidth())
            .attr("rx", 4);

        barsEnter.append("text")
            .attr("class", "label-brand")
            .attr("x", -10)
            .attr("y", y.bandwidth() / 2)
            .attr("dy", "0.35em")
            .attr("text-anchor", "end")
            .style("font-family", "var(--font-sans)")
            .style("font-weight", "600")
            .style("fill", "var(--color-text)")
            .text(d => d.brand);

        barsEnter.append("text")
            .attr("class", "label-value")
            .attr("x", d => x(d.value) + 10)
            .attr("y", y.bandwidth() / 2)
            .attr("dy", "0.35em")
            .style("font-family", "Monaco, monospace")
            .style("font-size", "0.85rem")
            .style("fill", "var(--color-text)")
            .text(d => formatNumber(d.value));

        const barsUpdate = barsEnter.merge(bars);

        barsUpdate.transition()
            .duration(duration)
            .ease(d3.easeLinear)
            .attr("transform", d => `translate(0,${y(d.rank)})`);

        barsUpdate.select("rect").transition()
            .duration(duration)
            .ease(d3.easeLinear)
            .attr("width", d => x(d.value));

        // Note: tweening text is expensive, so we just update it
        // A proper race chart uses a textTween for smooth numbers, implemented here:
        barsUpdate.select(".label-value").transition()
            .duration(duration)
            .ease(d3.easeLinear)
            .attr("x", d => x(d.value) + 10)
            .tween("text", function(d) {
                const i = d3.interpolateRound(parseInt(this.textContent.replace(/,/g, '')) || d.value, d.value);
                return function(t) { this.textContent = formatNumber(i(t)); };
            });

        bars.exit().transition()
            .duration(duration)
            .ease(d3.easeLinear)
            .attr("transform", `translate(0,${innerHeight})`)
            .remove();
    }

    // Playback logic
    const playBtn = document.getElementById('play-pause-btn');
    const replayBtn = document.getElementById('replay-btn');
    let playing = false;

    function tick() {
        if (currentFrame >= keyframes.length) {
            playing = false;
            clearInterval(ticker);
            playBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg> Reproducir';
            return;
        }
        update(keyframes[currentFrame]);
        currentFrame++;
    }

    function togglePlay() {
        if (playing) {
            playing = false;
            clearInterval(ticker);
            playBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg> Reproducir';
        } else {
            if (currentFrame >= keyframes.length) currentFrame = 0; // restart if at end
            playing = true;
            ticker = setInterval(tick, duration);
            playBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg> Pausa';
        }
    }

    playBtn.addEventListener('click', togglePlay);
    replayBtn.addEventListener('click', () => {
        playing = false;
        clearInterval(ticker);
        currentFrame = 0;
        update(keyframes[0]);
        togglePlay();
    });

    // Initialize first frame
    update(keyframes[0]);
    // Auto-play on load with a slight delay
    setTimeout(togglePlay, 1000);
}


// --- B. Multi-Line Chart (Export/Import) ---
function renderLineChart() {
    const container = document.getElementById('chart-line');
    const width = container.clientWidth;
    const height = container.clientHeight;
    const margin = { top: 40, right: 120, bottom: 40, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    container.innerHTML = '';
    const svg = d3.select(container).append('svg')
        .attr('width', width)
        .attr('height', height);

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
        .domain(d3.extent(tradeData, d => d.year))
        .range([0, innerWidth]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(tradeData, d => Math.max(d.exportacion, d.importacion)) * 1.1])
        .range([innerHeight, 0]);

    // Grid
    g.append('g')
        .attr('class', 'axis grid')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(x).ticks(years.length).tickFormat(d3.format("d")).tickSize(-innerHeight).tickPadding(15));
        
    g.append('g')
        .attr('class', 'axis grid')
        .call(d3.axisLeft(y).ticks(6).tickSize(-innerWidth).tickPadding(15).tickFormat(d => d / 1000000 + "M")); // Format in millions

    // Line generators
    const lineExp = d3.line()
        .x(d => x(d.year))
        .y(d => y(d.exportacion))
        .curve(d3.curveMonotoneX);

    const lineImp = d3.line()
        .x(d => x(d.year))
        .y(d => y(d.importacion))
        .curve(d3.curveMonotoneX);

    // Area generators for stylish glow/fill underneath
    const areaExp = d3.area()
        .x(d => x(d.year))
        .y0(innerHeight)
        .y1(d => y(d.exportacion))
        .curve(d3.curveMonotoneX);

    const areaImp = d3.area()
        .x(d => x(d.year))
        .y0(innerHeight)
        .y1(d => y(d.importacion))
        .curve(d3.curveMonotoneX);

    // Colors
    const colExp = "var(--color-accent)"; // Red
    const colImp = "var(--color-text)";   // Deep Blue

    // Draw Areas
    g.append('path')
        .datum(tradeData)
        .attr('fill', colExp)
        .attr('fill-opacity', 0.1)
        .attr('d', areaExp);
        
    g.append('path')
        .datum(tradeData)
        .attr('fill', colImp)
        .attr('fill-opacity', 0.05)
        .attr('d', areaImp);

    // Draw Lines with reveal animation
    const pathExp = g.append('path')
        .datum(tradeData)
        .attr('fill', 'none')
        .attr('stroke', colExp)
        .attr('stroke-width', 3)
        .attr('d', lineExp);

    const pathImp = g.append('path')
        .datum(tradeData)
        .attr('fill', 'none')
        .attr('stroke', colImp)
        .attr('stroke-width', 3)
        .attr('d', lineImp);

    // Reveal Animation
    [pathExp, pathImp].forEach(path => {
        const length = path.node().getTotalLength();
        path.attr('stroke-dasharray', length + ' ' + length)
            .attr('stroke-dashoffset', length)
            .transition()
            .duration(2000)
            .ease(d3.easeCubicOut)
            .attr('stroke-dashoffset', 0);
    });

    // Labels at the end of the lines
    const lastData = tradeData[tradeData.length - 1];
    g.append('text')
        .attr('x', x(lastData.year) + 10)
        .attr('y', y(lastData.exportacion))
        .attr('dy', '0.35em')
        .style('fill', colExp)
        .style('font-weight', 'bold')
        .style('font-family', 'var(--font-sans)')
        .text('Exportación');

    g.append('text')
        .attr('x', x(lastData.year) + 10)
        .attr('y', y(lastData.importacion))
        .attr('dy', '0.35em')
        .style('fill', colImp)
        .style('font-weight', 'bold')
        .style('font-family', 'var(--font-sans)')
        .text('Importación');

    // Interactive Tooltip (Hover effects)
    const focus = g.append('g').style('display', 'none');
    
    // Vertical guideline
    focus.append('line')
        .attr('class', 'hover-line')
        .attr('y1', 0)
        .attr('y2', innerHeight)
        .style('stroke', 'var(--color-border)')
        .style('stroke-width', 1)
        .style('stroke-dasharray', '3,3');

    // Circles
    const circleExp = focus.append('circle').attr('r', 6).attr('fill', colExp).attr('stroke', '#fff').attr('stroke-width', 2);
    const circleImp = focus.append('circle').attr('r', 6).attr('fill', colImp).attr('stroke', '#fff').attr('stroke-width', 2);

    // Tooltip DOM element
    const tooltip = d3.select(container).append('div')
        .attr('class', 'd3-tooltip');

    svg.append('rect')
        .attr('width', width)
        .attr('height', height)
        .style('fill', 'none')
        .style('pointer-events', 'all')
        .on('mouseover', () => { focus.style('display', null); tooltip.style('opacity', 1); })
        .on('mouseout', () => { focus.style('display', 'none'); tooltip.style('opacity', 0); })
        .on('mousemove', mousemove);

    const bisect = d3.bisector(d => d.year).left;

    function mousemove(event) {
        // Handle coordinates appropriately since svg rect has margin
        const [mx, my] = d3.pointer(event);
        const x0 = x.invert(mx - margin.left);
        // Ensure x0 is within bounds
        const xValid = Math.max(d3.min(years), Math.min(x0, d3.max(years)));
        
        let i = bisect(tradeData, xValid, 1);
        const d0 = tradeData[i - 1];
        const d1 = tradeData[i];
        let d = d0;
        if (d1) { d = xValid - d0.year > d1.year - xValid ? d1 : d0; }

        focus.select('.hover-line')
            .attr('transform', `translate(${x(d.year)}, 0)`);
            
        circleExp.attr('transform', `translate(${x(d.year)},${y(d.exportacion)})`);
        circleImp.attr('transform', `translate(${x(d.year)},${y(d.importacion)})`);

        // Tooltip HTML formatting
        const formatNumber = d3.format(",.0f");
        tooltip.html(`
            <div style="font-size:0.75rem; text-transform:uppercase; font-weight:bold; color:var(--color-text-light); margin-bottom:8px;">Año ${d.year}</div>
            <div style="display:flex; justify-content:space-between; width:150px; margin-bottom:4px;">
                <span style="color:${colExp}; font-weight:600;">Export</span>
                <span class="tooltip-value">${formatNumber(d.exportacion)}</span>
            </div>
            <div style="display:flex; justify-content:space-between; width:150px;">
                <span style="color:${colImp}; font-weight:600;">Import</span>
                <span class="tooltip-value">${formatNumber(d.importacion)}</span>
            </div>
        `)
        .style('left', (mx + 20) + "px")
        .style('top', (my - 40) + "px");
    }
}


// --- C. Streamgraph (Ventas) ---
function renderStreamgraph() {
    const container = document.getElementById('chart-stream');
    const width = container.clientWidth;
    const height = container.clientHeight;
    const margin = { top: 20, right: 30, bottom: 40, left: 30 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    container.innerHTML = '';
    const svg = d3.select(container).append('svg')
        .attr('width', width)
        .attr('height', height);

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // Stack Data
    const stack = d3.stack()
        .keys(brands)
        .offset(d3.stackOffsetWiggle); // This makes it a Streamgraph vs an Area Chart
    
    const stackedData = stack(salesData);

    const x = d3.scaleTime()
        .domain(d3.extent(salesData, d => d.date))
        .range([0, innerWidth]);

    const y = d3.scaleLinear()
        .domain([d3.min(stackedData, l => d3.min(l, d => d[0])), d3.max(stackedData, l => d3.max(l, d => d[1]))])
        .range([innerHeight, 0]);

    // Area generator
    const area = d3.area()
        .x(d => x(d.data.date))
        .y0(d => y(d[0]))
        .y1(d => y(d[1]))
        .curve(d3.curveBasis); // Smooth curves

    // Tooltip
    const tooltip = d3.select(container).append('div')
        .attr('class', 'd3-tooltip');

    // Draw Streamgraph
    g.selectAll(".layer")
        .data(stackedData)
        .enter().append("path")
        .attr("class", "layer")
        .attr("d", area)
        .style("fill", d => colors[d.key])
        .style("opacity", 0.85)
        .style("transition", "opacity 0.2s")
        .on("mouseover", function(event, d) {
            d3.selectAll(".layer").style("opacity", 0.2); // dim others
            d3.select(this).style("opacity", 1);
            
            tooltip.style('opacity', 1);
        })
        .on("mousemove", function(event, d) {
            // Find current data point roughly based on x position
            const [mx, my] = d3.pointer(event, svg.node());
            const invertedDate = x.invert(mx - margin.left);
            const year = invertedDate.getFullYear();
            const yearData = salesData.find(s => s.year === year) || salesData[0];
            
            const formatNumber = d3.format(",.0f");
            tooltip.html(`
                <div class="tooltip-title" style="color:${colors[d.key]}">${d.key}</div>
                <div style="font-size:0.75rem; font-weight:600; color:var(--color-text-light); margin-bottom:4px">Ventas ${year}</div>
                <div class="tooltip-value" style="color:var(--color-text)">${formatNumber(yearData[d.key])} <span style="font-size:0.7rem; font-family:var(--font-sans); font-weight:normal">unidades</span></div>
            `)
            .style('left', (mx + 20) + "px")
            .style('top', (my - 20) + "px");
        })
        .on("mouseout", function() {
            d3.selectAll(".layer").style("opacity", 0.85); // reveal all
            tooltip.style('opacity', 0);
        });

    // Add X axis
    g.append("g")
        .attr("class", "axis grid")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(d3.axisBottom(x).ticks(years.length).tickSize(-10).tickPadding(10));
}

// ============================================
// 3. INITIALIZATION
// ============================================

function init() {
    renderBarChartRace();
    renderLineChart();
    renderStreamgraph();
    
    // Resize handler using debounce
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            renderBarChartRace();
            renderLineChart();
            renderStreamgraph();
        }, 250);
    });
}

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', init);
