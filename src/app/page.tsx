import Image from "next/image";

export default function Home() {
  return (
    <>
      <h1 className="text-white">Brandon's Study Guide</h1>

      <form>
        <div className="input-box">
          <label htmlFor="term-label">Term</label>
          <input
            type="text"
            className="term-input"
            required
            placeholder="Term"
          />
        </div>

        <div className="input-box area">
          <label htmlFor="term-label"></label>
          <textarea
            // type="text-area"
            className="term-input text-area"
            rows={7}
            required
            placeholder="Description"
          />
        </div>

        <div className="input-box">
        <label htmlFor="term-label"></label>
        <input className="term-input" list="categories" name="browser" placeholder="Category"/>
          <datalist id="categories">
            <option value="Javascript"></option>
            <option value="VSCODE"></option>
            <option value="NextJs"></option>
            <option value="Node"></option>
            <option value="General Terms"></option>
          </datalist>
        
        </div>

      </form>
    </>
  );
}
