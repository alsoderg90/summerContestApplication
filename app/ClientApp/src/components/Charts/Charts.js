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

const colors = ['#1f77b4', '#ff7f0e', '#2ca02c']

export const BarChartComponent = ({ data }) => {
  return (
    <BarChart width={500} height={250} data={data}>
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='name' />
      <YAxis type='number' dataKey='points' />
      <Tooltip />
      <Legend />
      <Bar key='id' dataKey='points'>
        {data?.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>
  )
}

export const PieChartComponent = ({ data }) => {
  return (
    <PieChart width={500} height={250} data={data}>
      <CartesianGrid strokeDasharray='3 3' />
      <Tooltip />
      <Legend />
      <Pie data={data} dataKey='points'>
        {data?.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Pie>
    </PieChart>
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
