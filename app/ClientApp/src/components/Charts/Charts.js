import { useState } from 'react'
import { Carousel } from 'react-bootstrap'
import { GrNext, GrPrevious } from 'react-icons/gr'
import PropTypes from 'prop-types'
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Legend,
  CartesianGrid,
  Cell,
  PieChart,
  Pie,
  ResponsiveContainer
} from 'recharts'

import { getUserPoints } from 'utils/functions'

const colors = [
  '#1f77b4',
  '#ff7f0e',
  '#2ca02c',
  '#ffd700',
  '#40e0d0',
  '#bada55',
  '#00ff00',
  '#ff6666',
  '#660066',
  '#990000',
  '#daa520',
  '#a0db8e',
  '#66cccc',
  '#3399ff',
  '#ccff00',
  '#003366'
]

export const BarChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width='99%' aspect={1}>
      <BarChart data={data} width='100%' height='100%'>
        <CartesianGrid strokeDasharray='5 5' vertical={false} />
        <XAxis dataKey='name' angle={90} />
        <YAxis type='number' dataKey='points' />
        <Tooltip />
        <Bar
          key='id'
          dataKey='points'
          animationDuration={1500}
          animationEasing='ease-out'
          animationBegin={500}
        >
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export const PieChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width='99%' aspect={1}>
      <PieChart width={500} height={550} data={data}>
        <Tooltip />
        <Legend />
        <Pie
          data={data}
          dataKey='points'
          animationDuration={1500}
          animationEasing='ease-in-out'
        >
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

const Charts = ({ data }) => {
  const dataObjects = data?.map((d) => ({
    ...d,
    points: getUserPoints(d.points, d.id)
  }))

  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  }

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      nextIcon={GrNext()}
      prevIcon={GrPrevious()}
      style={{ left: '-15px', maxWidth: '700px' }}
    >
      <Carousel.Item>
        <BarChartComponent data={dataObjects} />
      </Carousel.Item>
      <Carousel.Item>
        <PieChartComponent data={dataObjects} />
      </Carousel.Item>
    </Carousel>
  )
}

Charts.propTypes = {
  data: PropTypes.array
}

BarChartComponent.propTypes = {
  data: PropTypes.array
}

PieChartComponent.propTypes = {
  data: PropTypes.array
}

export default Charts
