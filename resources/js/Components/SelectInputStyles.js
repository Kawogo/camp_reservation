export const SelectStyles = {
    control: (base, state) => ({
      ...base,
      "*": {
        boxShadow: "none !important",
      },
      padding: '2.5px',
      borderRadius: '8px',
      backgroundColor: '#f9fafb',
      color: '#1a202c', 
      fontSize: '0.875rem', 
      borderColor: state.isFocused ? '#2563EB' : '#d1d5db',
    })
}