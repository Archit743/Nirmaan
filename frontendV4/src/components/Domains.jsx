import React from 'react';
import '../Styles/Domains.css';

function Domains() {
  return (
    <section className="domains">
      {/* Item 1 */}
      <div className="item1">
        <div className="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center">
          <div className="list-group list-group-radio d-grid gap-2 border-0">
            <div className="position-relative">
              <input
                className="form-check-input position-absolute top-50 end-0 me-3 fs-5"
                type="radio"
                name="listGroupRadioGrid1"
                id="listGroupRadioGrid1"
                value=""
                defaultChecked
              />
              <label className="list-group-item py-3 pe-5" htmlFor="listGroupRadioGrid1">
                <strong className="fw-semibold">Food</strong>
                <span className="d-block small opacity-75">With support text underneath to add more detail</span>
              </label>
            </div>

            <div className="position-relative">
              <input
                className="form-check-input position-absolute top-50 end-0 me-3 fs-5"
                type="radio"
                name="listGroupRadioGrid1"
                id="listGroupRadioGrid2"
                value=""
              />
              <label className="list-group-item py-3 pe-5" htmlFor="listGroupRadioGrid2">
                <strong className="fw-semibold">Print</strong>
                <span className="d-block small opacity-75">Some other text goes here</span>
              </label>
            </div>

            <div className="position-relative">
              <input
                className="form-check-input position-absolute top-50 end-0 me-3 fs-5"
                type="radio"
                name="listGroupRadioGrid1"
                id="listGroupRadioGrid3"
                value=""
              />
              <label className="list-group-item py-3 pe-5" htmlFor="listGroupRadioGrid3">
                <strong className="fw-semibold">Parking</strong>
                <span className="d-block small opacity-75">And we end with another snippet of text</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Item 2 */}
      <div className="item2">
        <div className="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center">
          <div className="list-group list-group-radio d-grid gap-2 border-0">
            <div className="position-relative">
              <input
                className="form-check-input position-absolute top-50 end-0 me-3 fs-5"
                type="radio"
                name="listGroupRadioGrid2"
                id="listGroupRadioGrid4"
                value=""
                defaultChecked
              />
              <label className="list-group-item py-3 pe-5" htmlFor="listGroupRadioGrid4">
                <strong className="fw-semibold">Ev</strong>
                <span className="d-block small opacity-75">With support text underneath to add more detail</span>
              </label>
            </div>

            <div className="position-relative">
              <input
                className="form-check-input position-absolute top-50 end-0 me-3 fs-5"
                type="radio"
                name="listGroupRadioGrid2"
                id="listGroupRadioGrid5"
                value=""
              />
              <label className="list-group-item py-3 pe-5" htmlFor="listGroupRadioGrid5">
                <strong className="fw-semibold">feature +1</strong>
                <span className="d-block small opacity-75">Some other text goes here</span>
              </label>
            </div>

            <div className="position-relative">
              <input
                className="form-check-input position-absolute top-50 end-0 me-3 fs-5"
                type="radio"
                name="listGroupRadioGrid2"
                id="listGroupRadioGrid6"
                value=""
              />
              <label className="list-group-item py-3 pe-5" htmlFor="listGroupRadioGrid6">
                <strong className="fw-semibold">Feature +2</strong>
                <span className="d-block small opacity-75">And we end with another snippet of text</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Item 3 */}
      <div className="item3">
        <div className="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center">
          <div className="list-group list-group-radio d-grid gap-2 border-0">
            <div className="position-relative">
              <input
                className="form-check-input position-absolute top-50 end-0 me-3 fs-5"
                type="radio"
                name="listGroupRadioGrid3"
                id="listGroupRadioGrid7"
                value=""
                defaultChecked
              />
              <label className="list-group-item py-3 pe-5" htmlFor="listGroupRadioGrid7">
                <strong className="fw-semibold">Android</strong>
                <span className="d-block small opacity-75">With support text underneath to add more detail</span>
              </label>
            </div>

            <div className="position-relative">
              <input
                className="form-check-input position-absolute top-50 end-0 me-3 fs-5"
                type="radio"
                name="listGroupRadioGrid3"
                id="listGroupRadioGrid8"
                value=""
              />
              <label className="list-group-item py-3 pe-5" htmlFor="listGroupRadioGrid8">
                <strong className="fw-semibold">Whatsapp</strong>
                <span className="d-block small opacity-75">Some other text goes here</span>
              </label>
            </div>

            <div className="position-relative">
              <input
                className="form-check-input position-absolute top-50 end-0 me-3 fs-5"
                type="radio"
                name="listGroupRadioGrid3"
                id="listGroupRadioGrid9"
                value=""
              />
              <label className="list-group-item py-3 pe-5" htmlFor="listGroupRadioGrid9">
                <strong className="fw-semibold">Emails</strong>
                <span className="d-block small opacity-75">And we end with another snippet of text</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Domains;
