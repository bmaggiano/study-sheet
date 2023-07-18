import Image from "next/image";

export default function Home() {
  return (
    <>
      <h1 className="text-white">Brandon's Study Guide</h1>

      <form>
        <div className="input-box">
          <label htmlFor="term-label"></label>
          <input
            type="text"
            className="term-input"
            required
            placeholder="Term"
          />
        </div>

        <div className="input-box">
          <label htmlFor="term-label"></label>
          <input
            type="text"
            className="term-input"
            required
            placeholder="Description"
          />
        </div>
      </form>
    </>
  );
}
