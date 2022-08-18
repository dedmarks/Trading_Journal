import React from 'react'
import '../styles/Sessions.css'
import AsiaChart from './AsiaChart'
import LondonChart from './LondonChart'
import NYAMChart from './NYAMChart'
import NYPMChart from './NYPMChart'

function Sessions() {
  return (
    <div className="sessions__wraper">
        <div className="column1">
            <div className="don__container">
                <NYPMChart/>
            </div>
            <div className="don__container">
                <NYAMChart/>
            </div>
        </div>
        <div className="column1">
            <div className="don__container">
                <LondonChart/>
            </div>
            <div className="don__container">
                <AsiaChart/>
            </div>
        </div>
    </div>
  )
}

export default Sessions