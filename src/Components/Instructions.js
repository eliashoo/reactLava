import React from 'react';
import {Modal,Table} from 'react-bootstrap';

export default function Instructions({showInstructions,toggle_instructions}) {
  return (
    <Modal show={showInstructions} onHide={toggle_instructions}>
      <Modal.Header closeButton>
        <h1><a id="Stage_map_0"></a>Stage map</h1>
      </Modal.Header>
      <Modal.Body>
        <p>This is an app made for my personal usage. It is used to design stage and keep track of stage’s monitors and instruments. It may not be useful to others nor myself.</p>
        <h2><a id="Instructions_4"></a>Instructions</h2>
        <p>Select element from toolbar and click on map to add it. Every button has title with description about what is does.</p>
        <p>Element can be selected by clicking it and another click on stage moves it there. On desktop, elements can also be dragged with mouse.</p>
        <p>Elements are color coded and also marked with symbols.</p>
        <Table striped bordered>
        <thead>
        <tr>
        <th>Color</th>
        <th>Symbol</th>
        <th>Meaning</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td>Green</td>
        <td>Bullhorn</td>
        <td>Monitor</td>
        </tr>
        <tr>
        <td>Red</td>
        <td>Note</td>
        <td>Input</td>
        </tr>
        <tr>
        <td>Blue</td>
        <td>Grid</td>
        <td>Stage box</td>
        </tr>
        </tbody>
        </Table>
        <p>If you want to save your stage, you must login. Login works currently only with google account.</p>      </Modal.Body>
    </Modal>
  )
}
