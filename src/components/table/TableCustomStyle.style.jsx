
export const customStyles={
    table: {
      style: {
        width: '100%', // Ensure the table takes up 100% of its container width
        tableLayout: 'auto',
        padding: "0px", // Allow columns to adjust their width based on content
        margin: "0px",
        border: '1px solid #cccccc47',
      },

    },
    head: {
      style: {
        fontWeight: 'bold',
        fontSize: '12px', // Adjust font size if needed
        textAlign: 'center', // Align text in the header cells
        height: "20px",
      }
    },
    headCells: {
      style: {
        whiteSpace: 'normal', // Allow multi-line headers if needed
        fontSize: "10px",
        wordWrap: 'break-word', // Ensure long text wraps within the cell
        fontWeight: 'bold',
        paddingBottom: "0px", // Set padding for header row to 0
        paddingLeft: "20px",    // Set padding for header row to 0
        paddingRight: "0px",   // Set padding for header row to 0
        paddingTop: "0px",    // Set padding for header row to 0
        backgroundColor: '#cccccc47',
        height: "20px",
      },
    },
    cells: {
      style: {
        paddingBottom: "2px",
        paddingLeft: "20px",
        paddingRight: "2px",
        paddingTop: "2px",// Reduce padding for cells
        wordWrap: 'break-word', // Ensure long text wraps within the cell
        whiteSpace: 'normal', // Allow text to wrap inside cells
      },
    },
    rows: {
      style: {
        fontSize: '10px', // Smaller font size for rows
        minHeight: "20px",
      },
    },

    pagination: {
        style: {
          fontSize: '10px', // Adjust font size for pagination controls (including "Rows per page")
        },
      },
  }