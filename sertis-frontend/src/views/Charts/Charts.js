import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { Card, CardBody, CardColumns, CardHeader, Breadcrumb, BreadcrumbItem, Col, Row } from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

// const line = {
//   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//   datasets: [
//     {
//       label: 'My First dataset',
//       fill: false,
//       lineTension: 0.1,
//       backgroundColor: 'rgba(75,192,192,0.4)',
//       borderColor: 'rgba(75,192,192,1)',
//       borderCapStyle: 'butt',
//       borderDash: [],
//       borderDashOffset: 0.0,
//       borderJoinStyle: 'miter',
//       pointBorderColor: 'rgba(75,192,192,1)',
//       pointBackgroundColor: '#fff',
//       pointBorderWidth: 1,
//       pointHoverRadius: 5,
//       pointHoverBackgroundColor: 'rgba(75,192,192,1)',
//       pointHoverBorderColor: 'rgba(220,220,220,1)',
//       pointHoverBorderWidth: 2,
//       pointRadius: 1,
//       pointHitRadius: 10,
//       data: [65, 59, 80, 81, 56, 55, 40],
//     },
//   ],
// };

// const bar = {
//   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//   datasets: [
//     {
//       label: 'My First dataset',
//       backgroundColor: 'rgba(255,99,132,0.2)',
//       borderColor: 'rgba(255,99,132,1)',
//       borderWidth: 1,
//       hoverBackgroundColor: 'rgba(255,99,132,0.4)',
//       hoverBorderColor: 'rgba(255,99,132,1)',
//       data: [65, 59, 80, 81, 56, 55, 40],
//     },
//   ],
// };

// const doughnut = {
//   labels: [
//     'Red',
//     'Green',
//     'Yellow',
//   ],
//   datasets: [
//     {
//       data: [300, 50, 100],
//       backgroundColor: [
//         '#FF6384',
//         '#36A2EB',
//         '#FFCE56',
//       ],
//       hoverBackgroundColor: [
//         '#FF6384',
//         '#36A2EB',
//         '#FFCE56',
//       ],
//     }],
// };

// const radar = {
//   labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
//   datasets: [
//     {
//       label: 'My First dataset',
//       backgroundColor: 'rgba(179,181,198,0.2)',
//       borderColor: 'rgba(179,181,198,1)',
//       pointBackgroundColor: 'rgba(179,181,198,1)',
//       pointBorderColor: '#fff',
//       pointHoverBackgroundColor: '#fff',
//       pointHoverBorderColor: 'rgba(179,181,198,1)',
//       data: [65, 59, 90, 81, 56, 55, 40],
//     },
//     {
//       label: 'My Second dataset',
//       backgroundColor: 'rgba(255,99,132,0.2)',
//       borderColor: 'rgba(255,99,132,1)',
//       pointBackgroundColor: 'rgba(255,99,132,1)',
//       pointBorderColor: '#fff',
//       pointHoverBackgroundColor: '#fff',
//       pointHoverBorderColor: 'rgba(255,99,132,1)',
//       data: [28, 48, 40, 19, 96, 27, 100],
//     },
//   ],
// };

// const pie = {
//   labels: [
//     'Red',
//     'Green',
//     'Yellow',
//   ],
//   datasets: [
//     {
//       data: [300, 50, 100],
//       backgroundColor: [
//         '#FF6384',
//         '#36A2EB',
//         '#FFCE56',
//       ],
//       hoverBackgroundColor: [
//         '#FF6384',
//         '#36A2EB',
//         '#FFCE56',
//       ],
//     }],
// };

// const polar = {
//   datasets: [
//     {
//       data: [
//         11,
//         16,
//         7,
//         3,
//         14,
//       ],
//       backgroundColor: [
//         '#FF6384',
//         '#4BC0C0',
//         '#FFCE56',
//         '#E7E9ED',
//         '#36A2EB',
//       ],
//       label: 'My dataset' // for legend
//     }],
//   labels: [
//     'Red',
//     'Green',
//     'Yellow',
//     'Grey',
//     'Blue',
//   ],
// };

const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false
}

class Charts extends Component {

  constructor(pros) {
    super(pros);
    this.state = {
      impressions_insights: {},
      cpc_insights: {},
      clicks_insights: {},
      cpm_insights: {},
      cpp_insights: {},
      ctr_insights: {},
      campaign_name: '',
    }
  }

  componentDidMount() {
    fetch('http://10.17.40.104:8070/campaigns/23843341835580637/?bm_id=1704299786531439', {
        mode: 'cors',
        cache: 'default',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
        let age_range = ['Age: 25-34', 'Age: 35-44', 'Age: 45-54', 'Age: 55-64'];
        let male_impression_data = [];
        let female_impression_data = [];
        let unknown_impression_gender_data = [];
        let male_cpc_data = [];
        let female_cpc_data = [];
        let unknown_cpc_data = [];
        let male_click_data = [];
        let female_click_data = [];
        let unknown_click_data = [];
        let male_cpm_data = [];
        let female_cpm_data = [];
        let unknown_cpm_data = [];
        let male_cpp_data = [];
        let female_cpp_data = [];
        let unknown_cpp_data = [];
        let male_ctr_data = [];
        let female_ctr_data = [];
        let unknown_ctr_data = [];
        let male_spend_data = [];
        let female_spend_data = [];
        let unknown_spend_data = [];
        let male_reach_data = [];
        let female_reach_data = [];
        let unknown_reach_data = [];

        let campaign_name = data[0].campaign_name;
        const campaign_insight = {};

        for (let campaign_insight of data)
          
          if (campaign_insight.gender === 'male') {
            switch(campaign_insight.age) {
              case "25-34":
                male_impression_data[0] = campaign_insight.impressions;
                male_cpc_data[0] = campaign_insight.cpc;
                male_click_data[0] = campaign_insight.clicks;
                male_cpm_data[0] = campaign_insight.cpm;
                male_cpp_data[0] = campaign_insight.cpp;
                male_ctr_data[0] = campaign_insight.ctr;
                male_spend_data[0] = campaign_insight.spend;
                male_reach_data[0] = campaign_insight.reach;
                break;
              case "35-44":
                male_impression_data[1] = campaign_insight.impressions;
                male_cpc_data[1] = campaign_insight.cpc;
                male_click_data[1] = campaign_insight.clicks;
                male_cpm_data[1] = campaign_insight.cpm;
                male_cpp_data[1] = campaign_insight.cpp;
                male_ctr_data[1] = campaign_insight.ctr;
                male_spend_data[1] = campaign_insight.spend;
                male_reach_data[1] = campaign_insight.reach;
                break;
              case "45-54":
                male_impression_data[2] = campaign_insight.impressions;
                male_cpc_data[2] = campaign_insight.cpc;
                male_click_data[2] = campaign_insight.clicks;
                male_cpm_data[2] = campaign_insight.cpm;
                male_cpp_data[2] = campaign_insight.cpp;
                male_ctr_data[2] = campaign_insight.ctr;
                male_spend_data[2] = campaign_insight.spend;
                male_reach_data[2] = campaign_insight.reach;
                break;
              case "55-64":
                male_impression_data[3] = campaign_insight.impressions;
                male_cpc_data[3] = campaign_insight.cpc;
                male_click_data[3] = campaign_insight.clicks;
                male_cpm_data[3] = campaign_insight.cpm;
                male_cpp_data[3] = campaign_insight.cpp;
                male_ctr_data[3] = campaign_insight.ctr;
                male_spend_data[3] = campaign_insight.spend;
                male_reach_data[3] = campaign_insight.reach;
                break;
              default:
                break;
            }    
          } else if (campaign_insight.gender === 'female') {
            switch(campaign_insight.age) {
              case "25-34":
                female_impression_data[0] = campaign_insight.impressions;
                female_cpc_data[0] = campaign_insight.cpc;
                female_click_data[0] = campaign_insight.clicks;
                female_cpm_data[0] = campaign_insight.cpm;
                female_cpp_data[0] = campaign_insight.cpp;
                female_ctr_data[0] = campaign_insight.ctr;
                female_spend_data[0] = campaign_insight.spend;
                female_reach_data[0] = campaign_insight.reach;
                break;
              case "35-44":
                female_impression_data[1] = campaign_insight.impressions;
                female_cpc_data[1] = campaign_insight.cpc;
                female_click_data[1] = campaign_insight.clicks;
                female_cpm_data[1] = campaign_insight.cpm;
                female_cpp_data[1] = campaign_insight.cpp;
                female_ctr_data[1] = campaign_insight.ctr;
                female_spend_data[1] = campaign_insight.spend;
                female_reach_data[1] = campaign_insight.reach;
                break;
              case "45-54":
                female_impression_data[2] = campaign_insight.impressions;
                female_cpc_data[2] = campaign_insight.cpc;
                female_click_data[2] = campaign_insight.clicks;
                female_cpm_data[2] = campaign_insight.cpm;
                female_cpp_data[2] = campaign_insight.cpp;
                female_ctr_data[2] = campaign_insight.ctr;
                female_spend_data[2] = campaign_insight.spend;
                female_reach_data[2] = campaign_insight.reach;
                break;
              case "55-64":
                female_impression_data[3] = campaign_insight.impressions;
                female_cpc_data[3] = campaign_insight.cpc;
                female_click_data[3] = campaign_insight.clicks;
                female_cpm_data[3] = campaign_insight.cpm;
                female_cpp_data[3] = campaign_insight.cpp;
                female_ctr_data[3] = campaign_insight.ctr;
                female_spend_data[3] = campaign_insight.spend;
                female_reach_data[3] = campaign_insight.reach;
                break;
              default:
                break;
            }    
          } else {
            switch(campaign_insight.age) {
              case "25-34":
                unknown_impression_gender_data[0] = campaign_insight.impressions;
                unknown_cpc_data[0] = campaign_insight.cpc;
                unknown_click_data[0] = campaign_insight.clicks;
                unknown_cpm_data[0] = campaign_insight.cpm;
                unknown_cpp_data[0] = campaign_insight.cpp;
                unknown_ctr_data[0] = campaign_insight.ctr;
                unknown_spend_data[0] = campaign_insight.spend;
                unknown_reach_data[0] = campaign_insight.reach;
                break;
              case "35-44":
                unknown_impression_gender_data[1] = campaign_insight.impressions;
                unknown_cpc_data[1] = campaign_insight.cpc;
                unknown_click_data[1] = campaign_insight.clicks;
                unknown_cpm_data[1] = campaign_insight.cpm;
                unknown_cpp_data[1] = campaign_insight.cpp;
                unknown_ctr_data[1] = campaign_insight.ctr;
                unknown_spend_data[1] = campaign_insight.spend;
                unknown_reach_data[1] = campaign_insight.reach;
                break;
              case "45-54":
                unknown_impression_gender_data[2] = campaign_insight.impressions;
                unknown_cpc_data[2] = campaign_insight.cpc;
                unknown_click_data[2] = campaign_insight.clicks;
                unknown_cpm_data[2] = campaign_insight.cpm;
                unknown_cpp_data[2] = campaign_insight.cpp;
                unknown_ctr_data[2] = campaign_insight.ctr;
                unknown_spend_data[2] = campaign_insight.spend;
                unknown_reach_data[2] = campaign_insight.reach;
                break;
              case "55-64":
                unknown_impression_gender_data[3] = campaign_insight.impressions;
                unknown_cpc_data[3] = campaign_insight.cpc;
                unknown_click_data[3] = campaign_insight.clicks;
                unknown_cpm_data[3] = campaign_insight.cpm;
                unknown_cpp_data[3] = campaign_insight.cpp;
                unknown_ctr_data[3] = campaign_insight.ctr;
                unknown_spend_data[3] = campaign_insight.spend;
                unknown_reach_data[3] = campaign_insight.reach;
                break;
              default:
                break;
            }    
          }

        let impressions_chart = {
          labels: age_range,
          datasets: [
            {
              label: 'Male',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: male_impression_data,
            },
            {
              label: 'Female',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(241, 34, 34, 1)',
              borderColor: 'rgba(241, 34, 34, 1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(241, 34, 34, 1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(241, 34, 34, 1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: female_impression_data,
            },
            {
              label: 'Unknown',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(34, 241, 45, 1)',
              borderColor: 'rgba(34, 241, 45, 1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(34, 241, 45, 1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(34, 241, 45, 1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: unknown_impression_gender_data,
            },
          ],
        };

        let cpc_chart = {
          labels: age_range,
          datasets: [
            {
              label: 'Male',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: male_cpc_data,
            },
            {
              label: 'Female',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(241, 34, 34, 1)',
              borderColor: 'rgba(241, 34, 34, 1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(241, 34, 34, 1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(241, 34, 34, 1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: female_cpc_data,
            },
            {
              label: 'Unknown',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(34, 241, 45, 1)',
              borderColor: 'rgba(34, 241, 45, 1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(34, 241, 45, 1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(34, 241, 45, 1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: unknown_cpc_data,
            },
          ],
        };

        let click_chart = {
          labels: age_range,
          datasets: [
            {
              label: 'Male',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: male_click_data,
            },
            {
              label: 'Female',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(241, 34, 34, 1)',
              borderColor: 'rgba(241, 34, 34, 1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(241, 34, 34, 1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(241, 34, 34, 1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: female_click_data,
            },
            {
              label: 'Unknown',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(34, 241, 45, 1)',
              borderColor: 'rgba(34, 241, 45, 1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(34, 241, 45, 1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(34, 241, 45, 1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: unknown_click_data,
            },
          ],
        };

        let cpm_chart = {
          labels: age_range,
          datasets: [
            {
              label: 'Male',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: male_cpm_data,
            },
            {
              label: 'Female',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(241, 34, 34, 1)',
              borderColor: 'rgba(241, 34, 34, 1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(241, 34, 34, 1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(241, 34, 34, 1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: female_cpm_data,
            },
            {
              label: 'Unknown',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(34, 241, 45, 1)',
              borderColor: 'rgba(34, 241, 45, 1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(34, 241, 45, 1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(34, 241, 45, 1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: unknown_cpm_data,
            },
          ],
        };

        let cpp_chart = {
          labels: age_range,
          datasets: [
            {
              label: 'Male',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: male_cpp_data,
            },
            {
              label: 'Female',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(241, 34, 34, 1)',
              borderColor: 'rgba(241, 34, 34, 1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(241, 34, 34, 1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(241, 34, 34, 1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: female_cpp_data,
            },
            {
              label: 'Unknown',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(34, 241, 45, 1)',
              borderColor: 'rgba(34, 241, 45, 1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(34, 241, 45, 1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(34, 241, 45, 1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: unknown_cpp_data,
            },
          ],
        };

        let ctr_chart = {
          labels: age_range,
          datasets: [
            {
              label: 'Male',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: male_ctr_data,
            },
            {
              label: 'Female',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(241, 34, 34, 1)',
              borderColor: 'rgba(241, 34, 34, 1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(241, 34, 34, 1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(241, 34, 34, 1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: female_ctr_data,
            },
            {
              label: 'Unknown',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(34, 241, 45, 1)',
              borderColor: 'rgba(34, 241, 45, 1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(34, 241, 45, 1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(34, 241, 45, 1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: unknown_ctr_data,
            },
          ],
        };

        let spend_chart = {
          labels: age_range,
          datasets: [
            {
              label: 'Male',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: male_spend_data,
            },
            {
              label: 'Female',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(241, 34, 34, 1)',
              borderColor: 'rgba(241, 34, 34, 1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(241, 34, 34, 1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(241, 34, 34, 1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: female_spend_data,
            },
            {
              label: 'Unknown',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(34, 241, 45, 1)',
              borderColor: 'rgba(34, 241, 45, 1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(34, 241, 45, 1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(34, 241, 45, 1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: unknown_spend_data,
            },
          ],
        };

        let reach_chart = {
          labels: age_range,
          datasets: [
            {
              label: 'Male',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: male_reach_data,
            },
            {
              label: 'Female',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(241, 34, 34, 1)',
              borderColor: 'rgba(241, 34, 34, 1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(241, 34, 34, 1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(241, 34, 34, 1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: female_reach_data,
            },
            {
              label: 'Unknown',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(34, 241, 45, 1)',
              borderColor: 'rgba(34, 241, 45, 1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(34, 241, 45, 1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(34, 241, 45, 1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: unknown_reach_data,
            },
          ],
        };

        this.setState({impressions_insights: impressions_chart});
        this.setState({cpc_insights: cpc_chart});
        this.setState({clicks_insights: click_chart})
        this.setState({cpm_insights: cpm_chart})
        this.setState({cpp_insights: cpp_chart})
        this.setState({ctr_insights: ctr_chart})
        this.setState({spend_insights: spend_chart})
        this.setState({reach_insights: reach_chart})
        this.setState({campaign_name: campaign_name})

    })
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>{this.state.campaign_name}</strong>
              </CardHeader>
              <CardBody>
                <Breadcrumb tag="nav">
                  <BreadcrumbItem tag="a" href="#">OfficeMate</BreadcrumbItem>
                  <BreadcrumbItem tag="a" href="#">Campagin</BreadcrumbItem>
                  <BreadcrumbItem active tag="span">{this.state.campaign_name}</BreadcrumbItem>
                </Breadcrumb>
                <CardColumns className="cols-2">
                  <Card>
                    <CardHeader>
                      Breakdown Impressions by age and gender.
                    </CardHeader>
                    <CardBody>
                      <div className="chart-wrapper">
                        <Line data={this.state.impressions_insights} options={options} />
                      </div>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardHeader>
                      Breakdown CPC by age and gender.
                    </CardHeader>
                    <CardBody>
                      <div className="chart-wrapper">
                        <Line data={this.state.cpc_insights} options={options} />
                      </div>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardHeader>
                      Breakdown Spend by age and gender.
                    </CardHeader>
                    <CardBody>
                      <div className="chart-wrapper">
                        <Line data={this.state.spend_insights} options={options} />
                      </div>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardHeader>
                      Breakdown Reach by age and gender.
                    </CardHeader>
                    <CardBody>
                      <div className="chart-wrapper">
                        <Line data={this.state.reach_insights} options={options} />
                      </div>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardHeader>
                      Breakdown Clicks by age and gender.
                    </CardHeader>
                    <CardBody>
                      <div className="chart-wrapper">
                        <Line data={this.state.clicks_insights} options={options} />
                      </div>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardHeader>
                      Breakdown CPM by age and gender.
                    </CardHeader>
                    <CardBody>
                      <div className="chart-wrapper">
                        <Line data={this.state.cpm_insights} options={options} />
                      </div>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardHeader>
                      Breakdown CPP by age and gender.
                    </CardHeader>
                    <CardBody>
                      <div className="chart-wrapper">
                        <Line data={this.state.cpp_insights} options={options} />
                      </div>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardHeader>
                      Breakdown CTR by age and gender.
                    </CardHeader>
                    <CardBody>
                      <div className="chart-wrapper">
                        <Line data={this.state.ctr_insights} options={options} />
                      </div>
                    </CardBody>
                  </Card>
                  </CardColumns>
              </CardBody>
            </Card>
          </Col>
        </Row>
          {/* <Card>
            <CardHeader>
              Line Chart
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Line data={line} options={options} />
              </div>
            </CardBody>
          </Card> */}
          {/* <Card>
            <CardHeader>
              Bar Chart
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Bar data={bar} options={options} />
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              Doughnut Chart
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Doughnut data={doughnut} />
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              Radar Chart
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Radar data={radar} />
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              Pie Chart
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Pie data={pie} />
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              Polar Area Chart
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Polar data={polar} options={options}/>
              </div>
            </CardBody>
          </Card> */}
      </div>
    );
  }
}

export default Charts;
