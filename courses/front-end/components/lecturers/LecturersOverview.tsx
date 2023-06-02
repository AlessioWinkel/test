import React, { useState, useEffect } from "react";
import { Lecturer, User } from "../../types/index";
import { useRouter } from "next/router";

type Props = {
  lecturers: Array<Lecturer>;
  errorMessage: string;
};

const LecturersOverview: React.FC<Props> = ({ lecturers: lecturers, errorMessage }: Props) => {


  return (
    <>
      {errorMessage ? (
        <div className="alert alert-danger">{errorMessage}</div>
      ) : (
        <div className="col-6">
          {lecturers && (
            <>
              <p>
                Welcome!
              </p>
              <p>Click on someone's name to see their profile</p>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Lecturer username</th>
                    <th scope="col">Expertise </th>
                  </tr>
                </thead>
                <tbody>
                  {lecturers.map((lecturer, index) => (
                    <tr
                      key={index}
                    >
                      <td>{lecturer.user.username}</td>
                      <td>{lecturer.expertise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default LecturersOverview;
