import React from 'react';

// import components
import ServiceTableHeader from './ServiceTableHeader';
import TableContainerLeft from './TableContainerLeft';
import TableContainerRight from './TableContainerRight';

export default class AdditionalServices extends React.PureComponent {

  state = {
    serviceList: [],
    addtLeft: [],
    addtRight: [],
    services: [],
  }

  async componentDidMount () {
    const { context } = this.props;

    await context.actions.generateServiceList()
      .then(data => {
        this.setState({
          serviceList: data,
        });
      });
    
    this.splitData();
  }

  splitData() {
    const serviceData = this.state.serviceList;
    const halfLength = (arr) => {
      return Math.ceil(arr.length / 2);
    };

    var totalServices = [];
    var servicesArray = [];
    var addtArrayLeft = [];
    var addtArrayRight = [];

    serviceData.forEach(item => {
      totalServices.push(item);
    });

    addtArrayLeft = totalServices.slice(0, halfLength(totalServices));
    addtArrayRight = totalServices.slice(halfLength(totalServices), totalServices.length);

    this.setState({
      services: servicesArray,
      addtLeft: addtArrayLeft,
      addtRight: addtArrayRight,
    });

  }

  render() {

    return (
      <div className="additional--services">
        <h3>ADDITIONAL SERVICES</h3>
        <div className="additional--services--container">
          <section id="additional--services--1" className="bounds">
            <table>
              <thead>
                <>
                  <ServiceTableHeader />
                </>
              </thead>
              <tbody>
                <>
                  <TableContainerLeft 
                    data={this.state.addtLeft}
                  />
                </>
              </tbody>
            </table>
          </section>
          <section id="additional--services--2" className="bounds">
            <table>
              <thead>
                <>
                  <ServiceTableHeader />
                </>
              </thead>
              <tbody>
                  <>
                    <TableContainerRight 
                      data={this.state.addtRight}
                    />
                  </>
              </tbody>
            </table>
          </section>
        </div>
      </div>
    );
  }
};

// Source Services.js