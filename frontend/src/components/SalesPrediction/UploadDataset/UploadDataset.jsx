import { useState } from "react";

function UploadDataset({
  setCsvData,
  setSelectedFile,
}) {
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // =====================================================
  // HANDLE FILE UPLOAD
  // =====================================================

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    setError("");
    setCsvData([]);
    setSelectedFile(null);
    setFileName("");

    if (!file) {
      return;
    }

    // ===================================================
    // CHECK FILE TYPE
    // ===================================================

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setError("Please upload a CSV file only.");
      return;
    }

    setLoading(true);

    // ===================================================
    // READ CSV FILE
    // ===================================================

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const text = e.target.result;

        if (!text || text.trim() === "") {
          throw new Error("The CSV file is empty.");
        }

        // =================================================
        // SPLIT CSV INTO LINES
        // =================================================

        const lines = text
          .trim()
          .split(/\r?\n/)
          .filter((line) => line.trim() !== "");

        if (lines.length < 2) {
          throw new Error(
            "CSV must contain a header and at least one data row."
          );
        }

        // =================================================
        // PARSE CSV
        // =================================================

        const parseCSVLine = (line) => {
          const result = [];
          let current = "";
          let insideQuotes = false;

          for (let i = 0; i < line.length; i++) {
            const char = line[i];

            if (char === '"') {
              if (
                insideQuotes &&
                line[i + 1] === '"'
              ) {
                current += '"';
                i++;
              } else {
                insideQuotes = !insideQuotes;
              }
            } else if (
              char === "," &&
              !insideQuotes
            ) {
              result.push(current.trim());
              current = "";
            } else {
              current += char;
            }
          }

          result.push(current.trim());

          return result;
        };

        // =================================================
        // HEADERS
        // =================================================

        const headers = parseCSVLine(lines[0]).map(
          (header) =>
            header
              .replace(/^"|"$/g, "")
              .trim()
        );

        if (headers.length === 0) {
          throw new Error(
            "No columns were found in the CSV file."
          );
        }

        // =================================================
        // CREATE ROW OBJECTS
        // =================================================

        const rows = lines
          .slice(1)
          .map((line) => {
            const values = parseCSVLine(line);

            const row = {};

            headers.forEach((header, index) => {
              row[header] =
                values[index] !== undefined
                  ? values[index]
                  : "";
            });

            return row;
          });

        // =================================================
        // CHECK DATA
        // =================================================

        if (rows.length === 0) {
          throw new Error(
            "No data rows were found in the CSV."
          );
        }

        // =================================================
        // SUCCESS
        // =================================================

        setCsvData(rows);
        setSelectedFile(file);
        setFileName(file.name);
        setError("");

        console.log(
          "CSV loaded successfully:",
          file.name
        );

        console.log(
          "Rows:",
          rows.length
        );

        console.log(
          "Columns:",
          headers
        );
      } catch (err) {
        console.error(
          "CSV parsing error:",
          err
        );

        setError(
          err.message ||
            "Unable to read the CSV file."
        );

        setCsvData([]);
        setSelectedFile(null);
        setFileName("");
      } finally {
        setLoading(false);
      }
    };

    reader.onerror = () => {
      setError(
        "Unable to read the selected CSV file."
      );

      setCsvData([]);
      setSelectedFile(null);
      setFileName("");
      setLoading(false);
    };

    reader.readAsText(file);
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="rounded-2xl bg-white p-8 shadow-lg">

      {/* Header */}

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-slate-800">
          Upload Dataset
        </h2>

        <p className="mt-2 text-gray-500">
          Upload your CSV file to analyze and predict sales.
        </p>

      </div>

      {/* Upload Area */}

      <label
        htmlFor="salesCsvFile"
        className={`flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition ${
          loading
            ? "cursor-not-allowed border-gray-300 bg-gray-50"
            : "border-blue-400 hover:bg-blue-50"
        }`}
      >

        {loading ? (
          <>
            <div className="text-5xl">
              ⏳
            </div>

            <p className="mt-4 text-lg font-semibold text-slate-700">
              Reading Dataset...
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Please wait.
            </p>
          </>
        ) : (
          <>
            <div className="text-5xl">
              ☁️
            </div>

            <p className="mt-4 text-lg font-semibold text-slate-700">
              Click to Upload CSV
            </p>

            <p className="mt-1 text-sm text-gray-500">
              CSV files only
            </p>
          </>
        )}

      </label>

      <input
        id="salesCsvFile"
        type="file"
        accept=".csv,text/csv"
        className="hidden"
        onChange={handleFileChange}
        disabled={loading}
      />

      {/* Selected File */}

      {fileName && !error && (

        <div className="mt-5 flex items-center justify-between rounded-xl border border-green-200 bg-green-50 p-4">

          <div>

            <p className="text-sm text-gray-500">
              Selected File
            </p>

            <p className="font-semibold text-green-700">
              {fileName}
            </p>

          </div>

          <div className="text-2xl">
            📄
          </div>

        </div>

      )}

      {/* Error */}

      {error && (

        <div className="mt-5 rounded-xl border border-red-300 bg-red-50 p-4">

          <p className="font-semibold text-red-700">
            ⚠️ Dataset Validation Failed
          </p>

          <p className="mt-1 text-red-600">
            {error}
          </p>

          <p className="mt-2 text-sm text-red-500">
            Please upload a valid CSV dataset and try again.
          </p>

        </div>

      )}

      {/* Success */}

      {fileName && !error && !loading && (

        <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 p-4">

          <p className="font-semibold text-blue-700">
            ✅ Dataset Ready
          </p>

          <p className="mt-1 text-sm text-blue-600">
            Your CSV has been loaded successfully.
            You can now select the target column and generate predictions.
          </p>

        </div>

      )}

    </div>
  );
}

export default UploadDataset;