import React from "react";
import { Table} from 'react-bootstrap';

const ProfileWork = () => {
  return (
    <div className="profile-tab-content">
      <div className="profile-work-heading-body">
        <h5 className="profile-work-heading-h">Work History</h5>
        <p className="profile-work-heading-p2">Bug Raised: 0</p>
        <p className="profile-work-heading-p1">Builds Worked: 0</p>
      </div>

      <div className="profile-work-content">
        <h5 className="profile-work-pre-heading">All Contests</h5>
        <Table className="profile-work-contest-table">
        <thead>
          <tr className="profile-work-heading-table-top">
            <th className="profile-work-first-data1">Icon</th>
            <th>Contest Title</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
          </thead>
          <tbody>
          <tr className="profile-work-single-row1">
            <td className="profile-work-first-data1">icon1</td>
            <td>Airmeet Test Session IV</td>
            <td>28 May 20</td>
            <td>29 May 20</td>
          </tr>
          <tr className="profile-work-single-row1">
            <td className="profile-work-first-data1">icon2</td>
            <td>Airmeet Test Session IV</td>
            <td>14 May 20</td>
            <td>14 June 20</td>
          </tr>
          </tbody>
        </Table>

        <h5 className="profile-work-pre-heading">All Builds</h5>
        <Table className="profile-work-contest-table">
        <thead>
          <tr className="profile-work-heading-table-top">
            <th className="profile-work-first-data2">Icon</th>
            <th>Build</th>
            <th>Project</th>
            <th>Cycle Type</th>
            <th>Build Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
          </tr>
          </thead>
        </Table>
        <p className="profile-work-first-data2 profile-work-single-row2">
          No Work History
        </p>
      </div>
    </div>
  );
};

export default ProfileWork;
