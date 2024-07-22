const LandingPage = () => {
  return (
    <div>
      <h2>Welcome to Expense Tracker</h2>
      <div>
        <h3>Income</h3>
        <p>รายรับทั้งหมด: ฿0.00</p>
      </div>
      <div>
        <h3>Expenses</h3>
        <p>รายจ่ายทั้งหมด: ฿0.00</p>
      </div>
      <div>
        <button>เพิ่มรายรับ</button>
        <button>เพิ่มรายจ่าย</button>
      </div>
    </div>
  );
};

export default LandingPage;
