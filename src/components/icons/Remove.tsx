import '@/components/icons/icons.css';

export const Remove = () => {
//style="transform: rotate(45deg);fill: var(--n-500);width: 1.5rem;height: 1.5rem;"
  return (
    <svg
      viewBox="0 0 24 24"
      className="remove icn"
      strokeLinecap="round"
    >        
      <path
        transform="rotate(45)"
        transform-origin="center"
        d="M13 7H11V11L7 11V13H11V17H13V13H17V11L13 11V7Z"
      />
    </svg>
  )
}