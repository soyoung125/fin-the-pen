function Circle({ focused }: { focused: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
    >
      <circle cx="4" cy="4" r="4" fill={focused ? "#735BF2" : "#D9D9D9"} />
    </svg>
  );
}

export default Circle;
