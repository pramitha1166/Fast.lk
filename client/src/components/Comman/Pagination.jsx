import React, { useEffect } from "react";
import Loader from "react-loader-spinner";

const Pagination = ({ hasNext, hasPrevious, loadMore, isMoreDataLoading }) => {
  useEffect(() => {
    loadMore();
  }, []);

  useEffect(() => {
    window.onscroll = function () {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadMore();
      }
    };
  });

  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item" style={{ marginTop: 20, marginBlock: 20 }}>
            {hasNext ? (
              <>
                {isMoreDataLoading ? (
                  <Loader
                    type="ThreeDots"
                    color="red"
                    height={50}
                    width={50}
                    //3 secs
                  />
                ) : (
                  <button
                    onClick={() => {
                      loadMore();
                    }}
                    class="btn btn-danger btn-link"
                    style={{ fontWeight: "bold" }}
                  >
                    Next
                  </button>
                )}
              </>
            ) : null}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
