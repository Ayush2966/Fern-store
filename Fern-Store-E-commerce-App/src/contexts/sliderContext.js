import { createContext, useContext, useState } from "react";

const SliderContext = createContext();
const useSlider =() => useContext(SliderContext);

const SliderProvider = ({ children }) => {
  const { Provider } = SliderContext;

  const [slider, setSlider] = useState(false);

  return (
    <Provider value={{slider, setSlider}}>
      {children}
    </Provider>
  );
}

export{ SliderProvider, useSlider }