пишем функциональные компоненты function Button({ textColor, children, onClick, bgColor }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
