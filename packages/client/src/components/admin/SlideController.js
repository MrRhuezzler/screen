import SlideCreate from "./SlideCreate";
import SlideUpdate from "./SlideUpdate";

const SlideController = ({ navItem, data }) => {
  switch (navItem) {
    case 0:
      return <SlideCreate {...data.create} />;
    default:
      return <SlideUpdate {...data.update} />;
  }
};

export default SlideController;
