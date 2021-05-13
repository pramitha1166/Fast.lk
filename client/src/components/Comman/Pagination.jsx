import React, { Component } from "react";

const pagination = () => {
  return (
    <div style={{textAlign: "center", display: 'flex', flexDirection: 'row', justifyContent: "center"}}>
        <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="javascript:;">
            Previous
          </a>
        </li>

        <li class="page-item">
          <a class="page-link" href="javascript:;">
            Next
          </a>
        </li>
      </ul>
    </nav>
    </div>
  );
};

export default pagination;
