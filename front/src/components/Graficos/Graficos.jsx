import React, { useEffect, useRef, useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import * as d3 from 'd3'; 

 const dados = [
    { ano: "2020", total: 101 },
    { ano: "2021", total: 25 },
    { ano: "2022", total: 20 },
    { ano: "2023", total: 45 },
    { ano: "2024", total: 60 },
    { ano: "2025", total: 54 },
  ];


export default function Graficos() {
  const { t, lang } = useContext(LanguageContext);
  
  const graficoHolderRef = useRef(null);
  const graficoBarrasRef = useRef(null);
  const graficoDonutRef = useRef(null);

 
  // Função para o Gráfico de Barras
  const criarGrafico = (title, data, targetNode) => {
    d3.select(targetNode).selectAll("*").remove();
    const largura = 400;
    const altura = 300;
    const larguraBarra = 50;
    const espacoEntreBarras = 10;

    const svg = d3.select(targetNode)
      .append("svg")
      .attr("width", largura)
      .attr("height", altura + 25) 
      .style("background", "transparent");

    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect") 
      .attr("class", "bar")
      .attr("fill", 'var(--accent-color)')
      .attr("x", (d,i) => i * (larguraBarra + espacoEntreBarras))
      .attr("width", larguraBarra)
      .attr("y", altura)     
      .attr("height", 0)     
      .transition()          
      .duration(1000)       
      .delay((d, i) => i * 100) 
      .attr("y", d => altura - d.total) 
      .attr("height", d => d.total);

    svg.selectAll(".label-valor") 
      .data(data)
      .enter()
      .append("text")
      .text(d => d.total)
      .attr("x", (d,i) => i * (larguraBarra + espacoEntreBarras) + larguraBarra/2)
      .attr("y", d => altura - d.total - 5)
      .attr("text-anchor", "middle") 
      .attr("fill", 'var(--text-color)')
      .style("font-size", "12px")
      .style("opacity", 0)
      .transition()
      .delay(1200) 
      .style("opacity", 1);

    svg.selectAll(".label-ano")
      .data(data)
      .enter()
      .append("text")
      .text(d => d.ano)
      .attr("x", (d,i) => i * (larguraBarra + espacoEntreBarras) + larguraBarra/2)
      .attr("y", altura + 25)
      .attr("text-anchor", "middle")
      .attr("fill", 'var(--accent-color)')
      .style("font-size", "14px")
      .style("font-weight", "bold");

    svg.append("text")
      .attr("class", "h2")
      .attr("x", '50%')               
      .attr("y", 30)                        
      .attr("text-anchor", "middle")       
      .attr("fill", "var(--text-color)")                
      .style("font-size", "25px")           
      .style("font-weight", "bold")
      .text(title);
  };

  // Função para o Donut Chart
  const criarDonutChart = (title, data, targetNode) => {
    d3.select(targetNode).selectAll("*").remove();
    const largura = 500;
    const altura = 350;
    const margem = 40;

    const raioExterno = Math.min(largura, altura) / 2 - margem;
    const raioInterno = raioExterno * 0.65; 
    
    const svg = d3.select(targetNode)
      .append("svg")
      .attr("width", largura)
      .attr("height", altura + 30)
      .style("background", "transparent")
      .append("g")
      .attr("transform", `translate(${largura / 2}, ${(altura / 2) + 20})`);
    
    const coresModernas = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEEAD", "#D4A5A5"];
    const cores = d3.scaleOrdinal()
      .domain(data.map(d => d.ano))
      .range(coresModernas);

    const pie = d3.pie()
      .value(d => d.total)
      .sort(null)
      .padAngle(0.05);

    const arcLabels = d3.arc()
      .innerRadius(raioExterno * 1.2)
      .outerRadius(raioExterno * 1.2);
    
    const arc = d3.arc()
      .innerRadius(raioInterno)
      .outerRadius(raioExterno)
      .cornerRadius(10);

    const fatias = svg.selectAll("fatias")
      .data(pie(data))
      .enter()
      .append("g");

    fatias.append("path")
      .attr("fill", d => cores(d.data.ano))
      .style("filter", "drop-shadow(2px 4px 6px rgba(0,0,0,0.1))") 
      .transition()
      .duration(1200)
      .attrTween("d", function(d) {
          const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
          return function(t) {
              return arc(i(t));
          };
      });

    fatias.append("text")
      .html(d => `<tspan font-weight="bold">${d.data.ano}</tspan>: ${d.data.total}`)
      .attr("transform", d => `translate(${arcLabels.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("fill", 'var(--text-color, #555)')
      .style("font-size", "13px")
      .style("opacity", 0)
      .transition()
      .delay(1200)
      .duration(600)
      .style("opacity", 1);

    const valorTotal = d3.sum(data, d => d.total);

    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("y", -5)
      .attr("fill", "var(--text-color, #333)")
      .style("font-size", "32px")
      .style("font-weight", "bold")
      .style("opacity", 0)
      .text(valorTotal)
      .transition()
      .delay(1000)
      .duration(800)
      .style("opacity", 1);

    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("y", 20)
      .attr("fill", "var(--text-color, #777)")
      .style("font-size", "14px")
      .style("text-transform", "uppercase")
      .style("letter-spacing", "2px")
      .style("opacity", 0)
      .text("Total")
      .transition()
      .delay(1200)
      .duration(800)
      .style("opacity", 1);

    svg.append("text")
      .attr("class", "h2")
      .attr("x", 0)               
      .attr("y", - (altura / 2) + 5)                        
      .attr("text-anchor", "middle")       
      .attr("fill", "var(--text-color, #333)")                
      .style("font-size", "22px")           
      .style("font-weight", "bold")
      .text(title);
  };

  useEffect(() => {
    const tituloBarras = t('grafico_barras_titulo', 'Investigações Concluídas');
    const tituloDonut = t('grafico_donut_titulo', 'Investigações com Parceiros');

    const mostrarGrafico = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (graficoBarrasRef.current) criarGrafico(tituloBarras, dados, graficoBarrasRef.current);
          if (graficoDonutRef.current) criarDonutChart(tituloDonut, dados, graficoDonutRef.current);
        }
      });
    };

    const observer = new IntersectionObserver(mostrarGrafico);
    
    const currentHolder = graficoHolderRef.current;
    
    if (currentHolder) {
      observer.observe(currentHolder);
    }

    return () => {
      if (currentHolder) {
        observer.unobserve(currentHolder);
      }
    };
  }, [t, lang]);

  return (
    <section id="dados" className="section">
      <div className="container">
        <div className="section-header">
          <span className="subtitle" data-i18n="investigacoes_subtitle">
            {t('investigacoes_subtitle', 'Investigações')}
          </span>
          <h2 data-i18n="investigacoes_title">
            {t('investigacoes_title', 'As nossas Investigações')}
          </h2>
        </div>
        
        <div id="graficos-holder" ref={graficoHolderRef}>
          <div id="grafico-barras" ref={graficoBarrasRef}></div>
          <div id="grafico-donut" ref={graficoDonutRef}></div>
        </div>
      </div>
    </section>
  );
}