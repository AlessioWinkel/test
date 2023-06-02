import React, { useState, useEffect } from "react";
import { User } from "../../types/index";
import { useRouter } from "next/router";

type Props = {
  users: Array<User>;
  errorMessage: string;
};

const UserOverviewTable: React.FC<Props> = ({ users, errorMessage }: Props) => {


  return (
    <>
      {errorMessage ? (
        <div className="alert alert-danger">{errorMessage}</div>
      ) : (
        <div className="col-6">
          {users && (
            <>
              <p>
                Welcome!
              </p>
              <p>Click on someone's name to see their profile</p>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Username</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={index}
                    >
                      <td>{user.username}</td>
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

export default UserOverviewTable;
