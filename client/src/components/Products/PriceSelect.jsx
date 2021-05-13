import React, { Component } from "react";

const PriceSelect = () => {
  return (
    <>
      <div class="form-check form-check-radio">
        <label class="form-check-label">
          <input
            class="form-check-input"
            type="radio"
            name="exampleRadios"
            id="exampleRadios1"
            value="option1"
          />
          Rs 1000-
          <span class="circle">
            <span class="check bg-danger"></span>
          </span>
        </label>
      </div>
      <div class="form-check form-check-radio">
        <label class="form-check-label">
          <input
            class="form-check-input"
            type="radio"
            name="exampleRadios"
            id="exampleRadios2"
            value="option2"
            checked
          />
          Rs 1000 - 2500
          <span class="circle">
            <span class="check bg-danger"></span>
          </span>
        </label>
      </div>

      <div class="form-check form-check-radio">
        <label class="form-check-label">
          <input
            class="form-check-input"
            type="radio"
            name="exampleRadios"
            id="exampleRadios2"
            value="option2"
            checked
          />
          Rs 2500 - 5000
          <span class="circle">
            <span class="check bg-danger"></span>
          </span>
        </label>
      </div>
      <div class="form-check form-check-radio">
        <label class="form-check-label">
          <input
            class="form-check-input"
            type="radio"
            name="exampleRadios"
            id="exampleRadios2"
            value="option2"
            checked
          />
          Rs 5000+
          <span class="circle">
            <span class="check bg-danger"></span>
          </span>
        </label>
      </div>
    </>
  );
};

export default PriceSelect;
