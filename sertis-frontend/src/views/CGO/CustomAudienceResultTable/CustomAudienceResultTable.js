import React, { Component, useState} from "react";
import { Progress, Table, Button, Container, Row, Col, PopoverHeader, PopoverBody, Popover } from "reactstrap";


const PopoverContent = props => {
  const { data , id , onClick} = props;
  const [popoverOpen, setPopoverOpen] = useState(false);
  const toggle = () => setPopoverOpen(!popoverOpen);

  return (
    <>
    <Popover
        placement='top'
        isOpen={popoverOpen}
        target={"Popover-" + id}
        toggle={toggle}
        trigger="focus"
      >
      <PopoverHeader>Are you sure to delete this audience?<br /></PopoverHeader>
      <PopoverBody>
        {data.name}
        <br />
        <Container>
        <Row>
        <Col xs="6"><Button color="danger" size="sm" block onClick={onClick} value={data.t1_job_id}>Yes</Button>{' '}</Col>
        
        <Col xs="6"><Button color="secondary" size="sm" block>Cancel</Button>{' '}</Col>
        
        </Row>
        </Container>
      </PopoverBody>
    </Popover>
    </>
  )
};

class CustomAudienceResultTable extends Component {
  showData = data => {
    var result = null;
    if (data.length > 0) {
      result = data.map((data, i) => {
        return (
          <tr key={data.id}>
        <td>{data.name}</td>
        <td>
          {data.completed} of {data.total}
        </td>
        <td>
          <Progress
            animated
            color={data.completed === data.total ? "success" : ""}
            value={data.completed}
            max={data.total}
          />
        </td>
        <td>
          <div>
            <Button id={"Popover-"+i} block outline color="danger" size="sm">Delete</Button>
            <PopoverContent data={data} id={i} onClick={this.props.onClick} ></PopoverContent>
          </div>
        </td>
      </tr>
          
        );
      });
    }
    return result;
  };

  render() {
    var { data } = this.props;
    return (
      <Table responsive striped>
        <thead>
          <tr>
            <th>Audience Name</th>
            <th>Record(s)</th>
            <th>Progress</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.showData(data)}
        </tbody>
      </Table>
    );
  }
}

export default CustomAudienceResultTable;
