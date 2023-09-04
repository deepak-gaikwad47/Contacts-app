import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../Table/Table";
import styled from "styled-components";
import { Button } from "@mui/material";

const Home = ({ data, setData }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Contact",
        columns: [
          {
            Header: "First Name",
            accessor: "firstName",
          },
          {
            Header: "Last Name",
            accessor: "lastName",
          },
          {
            Header: "Email",
            accessor: "email",
          },
          {
            Header: "Phone Number",
            accessor: "phone",
          },
          {
            Header: "Gender",
            accessor: "gender",
          },
        ],
      },
      {
        Header: "Address",
        columns: [
          {
            Header: "City",
            accessor: "address.city",
          },
          {
            Header: "Country",
            accessor: "address.country",
          },
          {
            Header: "Zip code",
            accessor: "address.zipCode",
          },
        ],
      },
      {
        Header: "Actions",
        accessor: "id",
        Cell: ({ value }) => (
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={() => handleDelete(value)}
          >
            Delete
          </Button>
        ),
      },
    ],
    []
  );
  const Styles = styled.div`
    padding: 1rem;

    table {
      width: 100%;
      border-spacing: 0;
      border: 1px solid black;

      tr {
        :last-child {
          td {
            border-bottom: 0;
          }
        }
      }

      th,
      td {
        margin: 0;
        padding: 0.5rem;
        border-bottom: 1px solid black;
        border-right: 1px solid black;

        :last-child {
          border-right: 0;
        }

        input {
          font-size: 1rem;
          padding: 0;
          margin: 0;
          border: 0;
        }
      }
    }

    .pagination {
      padding: 0.5rem;
    }
  `;

  useEffect(() => {
    getData();
  }, []);

  const updateMyData = async (rowIndex, columnId, value) => {
    await Promise.all(
      data.map(async (row, index) => {
        if (index === rowIndex) {
          const [mainField, subField] = columnId.split(".");

          if (mainField && subField) {
            const updatedData = {
              ...row,
              [mainField]: {
                ...row[mainField],
                [subField]: value,
              },
            };

            const response = await fetch(
              `http://localhost:8080/api/contact/${updatedData.id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
              }
            );

            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const updatedContact = await response.json();
            data[index] = updatedContact.data;
          }
        }
      })
    );
    await getData();
  };

  const navigate = useNavigate();

  const getData = async () => {
    const data = await fetch(`http://localhost:8080/api/contacts`);
    const result = await data.json();
    setData(result.data);
  };

  const handleDelete = async (value) => {
    const response = await fetch(`http://localhost:8080/api/contact/${value}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    getData();
  };

  return (
    <>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        Contact Table
      </h1>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        style={{ marginLeft: "20px" }}
        onClick={() => navigate("/newContact")}
      >
        Add Contact
      </Button>
      <Styles>
        <Table columns={columns} data={data} updateMyData={updateMyData} />
      </Styles>
    </>
  );
};

export default Home;
