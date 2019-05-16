
(() => {
  const header = document.getElementById('header')
  const title = 'Software Thoughts'
  const time = 120
  let titleChars = title.split('').reverse()
  const typeNext = (nextChar) => {
    header.textContent = header.textContent + nextChar;
    const nextTime = time + (Math.random() * 120)
    if (titleChars.length) {
      setTimeout(() => typeNext(titleChars.pop()), nextTime)
    }
  }
  setTimeout(() => typeNext(titleChars.pop()), 2000)

})()


import * as d3 from 'd3'

const height = 500
const width = 500
const padding = 30
const center = {y: height / 2, x: width / 2}
const numPoints = 23
const duration = 3000
const ease = d3.easeCubic
const colorScale = d3.interpolateCool
const points = createPoints(numPoints, width, height)

const style = {
  background: {
    color: d3.color('white')
  },
  point: {
    color: d3.color('#c24912')
  }
}

function createPoints(numPoints, width, height) {
  return d3
    .range(numPoints)
    .map(id => {
      return {
        id,
        x: d3.randomUniform(padding, width - padding)(),
        y: d3.randomUniform(padding, width- padding)()
      }
    })
}

function F(x, y) {
  return [
    d3.randomUniform(padding, width - padding)(),
    d3.randomUniform(padding, width- padding)()
  ]
}

function assignBoundary(points) {
  return points.map(p => {
    const [tx, ty] = F(p.x, p.y)
    return Object.assign({}, p, {
      tx,
      ty,
      sx: p.x,
      sy: p.y,
    })
  })
}

function drawPoints(ctx, points) {
  const maxDist = Math.sqrt(Math.pow(height - center.y, 2) + Math.pow(width - center.x, 2))
  points.forEach((p) => {
    const {
      x,
      y
    } = p
    const diameter = d3.scaleLinear()
          .domain([0, maxDist])
          .range([1, 20])
    const dist = Math.sqrt(Math.pow(y - center.y, 2) + Math.pow(x - center.x, 2));
    ctx.fillStyle = d3.lab(colorScale(dist/maxDist))
    ctx.beginPath()
    ctx.arc(x, y, diameter(dist), 0, 2 * Math.PI, true)
    ctx.fill()
    ctx.closePath()
  })

  ctx.restore()
}

const interpolate = (point, t) =>
      Object.assign({}, point, {
        x: d3.interpolate(point.sx, point.tx)(t),
        y: d3.interpolate(point.sy, point.ty)(t)
      })

function animate(points) {
  const pointsWithBoundary = assignBoundary(points)

  const ctx = canvas.node().getContext('2d')
  ctx.save()

  const timer = d3.timer((elapsed) => {
    const t = Math.min(1, ease(elapsed / duration))
    const newPoints = pointsWithBoundary.map(p => interpolate(p, t))

    ctx.clearRect(0, 0, width, height)

    drawPoints(ctx, newPoints)

    if (t === 1) {
      timer.stop()
      animate(newPoints)
    }
  })
}

const screenScale = window.devicePixelRatio || 1
const canvas = d3.select('#canvas')
      .append('canvas')
      .attr('width', width * screenScale)
      .attr('height', height * screenScale)
      .style('width', `${width}px`)
      .style('height', `${height}px`)
      .style('background-color', style.background.color)

let ctx = canvas.node().getContext('2d').scale(screenScale, screenScale)

animate(points)

if (module.hot) {
  module.hot.dispose(() => {
    window.location.reload()
  })
}
