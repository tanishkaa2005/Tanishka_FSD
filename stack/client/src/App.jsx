import { useEffect, useMemo, useState } from "react";
import "./App.css";

const emptyForm = {
  passengerName: "",
  from: "",
  to: "",
  date: "",
  departureDate: "",
  arrivalDate: "",
  phoneNumber: "",
  emailId: "",
};

function toInputDateValue(v) {
  if (!v) return "";
  // Accept ISO date strings and Date-like values; normalize to yyyy-mm-dd for <input type="date">
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return "";
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function App() {
  const [form, setForm] = useState(emptyForm);
  const [rows, setRows] = useState([]);
  const [searchPhone, setSearchPhone] = useState("");
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const sortedRows = useMemo(() => {
    return [...rows].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  }, [rows]);

  async function apiFetch(path, options) {
    const res = await fetch(path, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      const msg = data?.message || `Request failed (${res.status})`;
      throw new Error(msg);
    }
    return data;
  }

  async function refresh() {
    const data = await apiFetch("/api/passengers");
    setRows(Array.isArray(data) ? data : []);
  }

  useEffect(() => {
    refresh().catch((e) => setStatus({ type: "error", message: e.message }));
  }, []);

  function updateField(name, value) {
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function onCreate(e) {
    e.preventDefault();
    setStatus({ type: "idle", message: "" });
    try {
      await apiFetch("/api/passengers", {
        method: "POST",
        body: JSON.stringify(form),
      });
      // Clear the page inputs after successful insert
      setForm(emptyForm);
      setSearchPhone("");
      await refresh();
      setStatus({ type: "success", message: "Passenger record inserted." });
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    }
  }

  async function onSearch() {
    setStatus({ type: "idle", message: "" });
    try {
      const phone = String(searchPhone || "").trim();
      if (!phone) throw new Error("Enter a phone number to search.");
      const data = await apiFetch(`/api/passengers/${encodeURIComponent(phone)}`);
      setForm({
        passengerName: data.passengerName ?? "",
        from: data.from ?? "",
        to: data.to ?? "",
        date: toInputDateValue(data.date),
        departureDate: toInputDateValue(data.departureDate),
        arrivalDate: toInputDateValue(data.arrivalDate),
        phoneNumber: data.phoneNumber ?? phone,
        emailId: data.emailId ?? "",
      });
      setStatus({ type: "success", message: "Record loaded. You can update it now." });
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    }
  }

  async function onUpdate() {
    setStatus({ type: "idle", message: "" });
    try {
      const phone = String(form.phoneNumber || "").trim();
      if (!phone) throw new Error("phoneNumber is required for update.");
      await apiFetch(`/api/passengers/${encodeURIComponent(phone)}`, {
        method: "PUT",
        body: JSON.stringify(form),
      });
      await refresh();
      setStatus({ type: "success", message: "Passenger record updated." });
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    }
  }

  async function onDelete(phoneNumber) {
    setStatus({ type: "idle", message: "" });
    try {
      const phone = String(phoneNumber || "").trim();
      if (!phone) throw new Error("phoneNumber is required for delete.");
      await apiFetch(`/api/passengers/${encodeURIComponent(phone)}`, { method: "DELETE" });
      if (form.phoneNumber === phone) setForm(emptyForm);
      await refresh();
      setStatus({ type: "success", message: "Passenger record deleted." });
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    }
  }

  return (
    <div className="page">
      <header className="header">
        <div>
          <h1>Flight Booking Management</h1>
          <p className="muted">MERN CRUD (Create, Read, Update, Delete) by Phone Number</p>
        </div>
        <button className="btn" onClick={() => refresh().catch((e) => setStatus({ type: "error", message: e.message }))}>
          Refresh Table
        </button>
      </header>

      <section className="card">
        <div className="toolbar">
          <div className="search">
            <label>
              Search by Phone Number
              <input value={searchPhone} onChange={(e) => setSearchPhone(e.target.value)} placeholder="e.g. 9876543210" />
            </label>
            <button className="btn" type="button" onClick={onSearch}>
              Load Record
            </button>
          </div>
          <div className="actions">
            <button className="btn secondary" type="button" onClick={() => setForm(emptyForm)}>
              Clear Form
            </button>
            <button className="btn warning" type="button" onClick={() => onDelete(form.phoneNumber)}>
              Delete (by Phone)
            </button>
            <button className="btn" type="button" onClick={onUpdate}>
              Update (by Phone)
            </button>
          </div>
        </div>

        <form className="form" onSubmit={onCreate}>
          <label>
            Passenger name
            <input value={form.passengerName} onChange={(e) => updateField("passengerName", e.target.value)} required />
          </label>
          <label>
            From
            <input value={form.from} onChange={(e) => updateField("from", e.target.value)} required />
          </label>
          <label>
            To
            <input value={form.to} onChange={(e) => updateField("to", e.target.value)} required />
          </label>
          <label>
            Date
            <input type="date" value={form.date} onChange={(e) => updateField("date", e.target.value)} required />
          </label>
          <label>
            Departure date
            <input
              type="date"
              value={form.departureDate}
              onChange={(e) => updateField("departureDate", e.target.value)}
              required
            />
          </label>
          <label>
            Arrival date
            <input type="date" value={form.arrivalDate} onChange={(e) => updateField("arrivalDate", e.target.value)} required />
          </label>
          <label>
            Phone number (unique key)
            <input value={form.phoneNumber} onChange={(e) => updateField("phoneNumber", e.target.value)} required />
          </label>
          <label>
            Email ID
            <input type="email" value={form.emailId} onChange={(e) => updateField("emailId", e.target.value)} required />
          </label>

          <div className="formFooter">
            <button className="btn" type="submit">
              Insert Passenger Details
            </button>
            {status.message ? (
              <div className={status.type === "error" ? "status error" : "status ok"}>{status.message}</div>
            ) : (
              <div className="status muted">Tip: phone number is the unique identifier for Update/Delete.</div>
            )}
          </div>
        </form>
      </section>

      <section className="card">
        <h2>Flight Booking Details</h2>
        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>Passenger</th>
                <th>From</th>
                <th>To</th>
                <th>Date</th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>Phone</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sortedRows.length === 0 ? (
                <tr>
                  <td colSpan={9} className="muted">
                    No records yet.
                  </td>
                </tr>
              ) : (
                sortedRows.map((r) => (
                  <tr key={r._id}>
                    <td>{r.passengerName}</td>
                    <td>{r.from}</td>
                    <td>{r.to}</td>
                    <td>{toInputDateValue(r.date)}</td>
                    <td>{toInputDateValue(r.departureDate)}</td>
                    <td>{toInputDateValue(r.arrivalDate)}</td>
                    <td>{r.phoneNumber}</td>
                    <td>{r.emailId}</td>
                    <td className="rowActions">
                      <button
                        className="link"
                        type="button"
                        onClick={() => {
                          setSearchPhone(r.phoneNumber);
                          onDelete(r.phoneNumber);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default App;
