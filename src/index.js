import data from '../generateJson/postcode-data.json';
import './index.css';
import * as d3 from 'd3';

const width = 600;
const height = 400;
const margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 70,
};
const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;

const xVal = (dp) => dp.lng;
const xScale = d3.scaleLinear().domain(d3.extent(data, xVal)).range([0, width]);
const yVal = (dp) => dp.lat;
const yScale = d3
  .scaleLinear()
  .domain(d3.extent(data, yVal))
  .range([0, height]);

const body = d3.select('body');
const svg = body.append('svg').attr('transform', `translate(${100}, ${100})`);
svg.attr('height', height).attr('width', width);
const g = svg.append('g');

g.selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr('r', 2)
  .attr('fill', 'red')
  .attr('cx', (dp) => xScale(dp.lng))
  .attr('cy', (dp) => yScale(dp.lat))
  .attr('data-index', (dp) => dp.id)
  .append('title')
  .text((dp) => dp.Suburb);
