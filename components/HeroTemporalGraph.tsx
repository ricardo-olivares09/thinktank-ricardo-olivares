"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function HeroTemporalGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const numNodes = 180;
    const nodes: any[] = [];
    const links: any[] = [];

    // Abstract scattered nodes
    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        id: i,
        radius: Math.random() > 0.9 ? 3 : 1.5,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0
      });
    }

    // Connect nearest neighbors for a clean, organic web
    // D3 forceLink will pull them together
    for (let i = 0; i < numNodes; i++) {
        const target = Math.floor(Math.random() * numNodes);
        if (target !== i) {
            links.push({ source: i, target: target });
        }
        if (Math.random() > 0.8) {
             const target2 = Math.floor(Math.random() * numNodes);
             if (target2 !== i) links.push({ source: i, target: target2 });
        }
    }

    const simulation = d3.forceSimulation(nodes as d3.SimulationNodeDatum[])
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(80).strength(0.1))
      .force("charge", d3.forceManyBody().strength(-30))
      .force("center", d3.forceCenter(width / 2, height / 2).strength(0.01))
      .force("collide", d3.forceCollide().radius((d: any) => d.radius + 5).iterations(2))
      .alphaTarget(0.1) // Keep moving forever
      .velocityDecay(0.4);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let isMouseMoving = false;
    let mouseTimeout: any;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseMoving = true;
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => { isMouseMoving = false; }, 100);
      simulation.alpha(0.3).restart();
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Render loop
    simulation.on("tick", () => {
      // Clear with absolute #000511 to allow the grid overlay in page.tsx to shine through via screen blend
      context.fillStyle = "#000511";
      context.fillRect(0, 0, width, height);

      // Interactive mouse repel
      if (isMouseMoving) {
        for (const node of nodes) {
          const dx = node.x - mouseX;
          const dy = node.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            node.vx += (dx / dist) * 1.5;
            node.vy += (dy / dist) * 1.5;
          }
        }
      }

      // Draw links
      context.beginPath();
      for (const link of links) {
        context.moveTo(link.source.x, link.source.y);
        context.lineTo(link.target.x, link.target.y);
      }
      context.strokeStyle = "rgba(255, 255, 255, 0.12)";
      context.lineWidth = 0.5;
      context.stroke();

      // Draw nodes
      context.fillStyle = "rgba(255, 255, 255, 0.9)";
      for (const node of nodes) {
        context.beginPath();
        context.moveTo(node.x + node.radius, node.y);
        context.arc(node.x, node.y, node.radius, 0, 2 * Math.PI);
        context.fill();
      }
    });

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      simulation.stop();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden mix-blend-screen opacity-80">
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
      />
    </div>
  );
}
