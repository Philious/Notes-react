import '@/components/icons/icons.css';

export const List = () => {

  return (
    <svg
      viewBox="0 0 16 16"
      className="list icn"
    >
      <circle
        className="circle"
        cx="2"
        cy="3"
        r="1.5"
      />
      <circle
        className="circle"
        cx="2"
        cy="8"
        r="1.5"
      />
      <circle
        className="circle"
        cx="2"
        cy="13"
        r="1.5"
      />
      <path
        className="path"
        d="M6 3H16M6 8H16M6 13H16"
      />
    </svg>
  )
}