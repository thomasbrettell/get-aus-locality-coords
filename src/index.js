import data from '../generateJson/postcode-data.json';
import './index.css';
import * as d3 from 'd3';

console.log(data.length);

const width = window.innerWidth - 200;
const height = window.innerHeight - 200;
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
  .range([height, 0]);

const body = d3.select('body');
const root = body.append('div').attr('id', 'root');
const svg = root.append('svg');
svg.attr('height', height).attr('width', width);
const g = svg.append('g');

g.selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr('r', 4)
  .attr('fill', 'red')
  .attr('cy', (dp) => yScale(dp.lat))
  .attr('cx', (dp) => xScale(dp.lng))
  .attr('data-lat', (dp) => dp.lat)
  .attr('data-lng', (dp) => dp.lng)
  .attr('data-id', (dp) => dp.id)
  .attr('data-nn', (dp) => dp.nnId)
  .attr('data-score', (dp) => dp.score)
  .attr('data-state', (dp) => dp.State)
  .append('title')
  .text((dp) => dp.id);
