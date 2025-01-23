import * as IconsAi from "react-icons/ai";
import * as IconsBi from "react-icons/bi";
import * as IconsBs from "react-icons/bs";
import * as IconsCg from "react-icons/cg";
import * as IconsCi from "react-icons/ci";
import * as IconsDi from "react-icons/di";
import * as IconsFa from "react-icons/fa";
import * as IconsFc from "react-icons/fc";
import * as IconsFi from "react-icons/fi";
import * as IconsGi from "react-icons/gi";
import * as IconsGo from "react-icons/go";
import * as IconsGr from "react-icons/gr";
import * as IconsHi from "react-icons/hi";
import * as IconsIm from "react-icons/im";
import * as IconsIo from "react-icons/io";
import * as IconsMd from "react-icons/md";
import * as IconsRi from "react-icons/ri";
import * as IconsRx from "react-icons/rx";
import * as IconsTb from "react-icons/tb";
import * as IconsVsc from "react-icons/vsc";

const DynamicIcons = ({ name, style, iconColor }) => {
  const type = name?.slice(0, 2);

  if (type === "Fa") {
    const IconComponent = IconsFa[name];

    if (!IconComponent) {
      return <IconsFa.FaBeer style={{ color: iconColor && iconColor }} />;
    }

    return (
      <IconComponent
        className={style}
        style={{ color: iconColor && iconColor }}
      />
    );
  } else if (type === "Ai") {
    const IconComponent = IconsAi[name];

    if (!IconComponent) {
      return <IconsFa.FaBeer style={{ color: iconColor && iconColor }} />;
    }

    return (
      <IconComponent
        className={style}
        style={{ color: iconColor && iconColor }}
      />
    );
  } else if (type === "Tb") {
    const IconComponent = IconsTb[name];

    if (!IconComponent) {
      return <IconsFa.FaBeer style={{ color: iconColor && iconColor }} />;
    }

    return (
      <IconComponent
        className={style}
        style={{ color: iconColor && iconColor }}
      />
    );
  } else if (type === "Rx") {
    const IconComponent = IconsRx[name];

    if (!IconComponent) {
      return <IconsFa.FaBeer style={{ color: iconColor && iconColor }} />;
    }

    return (
      <IconComponent
        className={style}
        style={{ color: iconColor && iconColor }}
      />
    );
  } else if (type === "Io") {
    const IconComponent = IconsIo[name];

    if (!IconComponent) {
      return <IconsFa.FaBeer style={{ color: iconColor && iconColor }} />;
    }

    return (
      <IconComponent
        className={style}
        style={{ color: iconColor && iconColor }}
      />
    );
  } else if (type === "Im") {
    const IconComponent = IconsIm[name];

    if (!IconComponent) {
      return <IconsFa.FaBeer style={{ color: iconColor && iconColor }} />;
    }

    return (
      <IconComponent
        className={style}
        style={{ color: iconColor && iconColor }}
      />
    );
  } else if (type === "Hi") {
    const IconComponent = IconsHi[name];

    if (!IconComponent) {
      return <IconsFa.FaBeer style={{ color: iconColor && iconColor }} />;
    }

    return (
      <IconComponent
        className={style}
        style={{ color: iconColor && iconColor }}
      />
    );
  } else if (type === "Gr") {
    const IconComponent = IconsGr[name];

    if (!IconComponent) {
      return <IconsFa.FaBeer style={{ color: iconColor && iconColor }} />;
    }

    return (
      <IconComponent
        className={style}
        style={{ color: iconColor && iconColor }}
      />
    );
  } else if (type === "Go") {
    const IconComponent = IconsGo[name];

    if (!IconComponent) {
      return <IconsFa.FaBeer style={{ color: iconColor && iconColor }} />;
    }

    return (
      <IconComponent
        className={style}
        style={{ color: iconColor && iconColor }}
      />
    );
  } else if (type === "Gi") {
    const IconComponent = IconsGi[name];

    if (!IconComponent) {
      return <IconsFa.FaBeer style={{ color: iconColor && iconColor }} />;
    }

    return (
      <IconComponent
        className={style}
        style={{ color: iconColor && iconColor }}
      />
    );
  } else if (type === "Fi") {
    const IconComponent = IconsFi[name];

    if (!IconComponent) {
      return <IconsFa.FaBeer style={{ color: iconColor && iconColor }} />;
    }

    return (
      <IconComponent
        className={style}
        style={{ color: iconColor && iconColor }}
      />
    );
  } else if (type === "Fc") {
    const IconComponent = IconsFc[name];

    if (!IconComponent) {
      return <IconsFa.FaBeer style={{ color: iconColor && iconColor }} />;
    }

    return (
      <IconComponent
        className={style}
        style={{ color: iconColor && iconColor }}
      />
    );
  } else if (type === "Di") {
    const IconComponent = IconsDi[name];

    if (!IconComponent) {
      return <IconsFa.FaBeer style={{ color: iconColor && iconColor }} />;
    }

    return (
      <IconComponent
        className={style}
        style={{ color: iconColor && iconColor }}
      />
    );
  } else if (type === "Cg") {
    const IconComponent = IconsCg[name];

    if (!IconComponent) {
      return <IconsFa.FaBeer style={{ color: iconColor && iconColor }} />;
    }

    return (
      <IconComponent
        className={style}
        style={{ color: iconColor && iconColor }}
      />
    );
  } else if (type === "Bi") {
    const IconComponent = IconsBi[name];

    if (!IconComponent) {
      return <IconsFa.FaBeer style={{ color: iconColor && iconColor }} />;
    }

    return (
      <IconComponent
        className={style}
        style={{ color: iconColor && iconColor }}
      />
    );
  } else if (type === "Md") {
    const IconComponent = IconsMd[name];

    if (!IconComponent) {
      return <IconsFa.FaBeer style={{ color: iconColor && iconColor }} />;
    }

    return (
      <IconComponent
        className={style}
        style={{ color: iconColor && iconColor }}
      />
    );
  } else if (type === "Bs") {
    const IconComponent = IconsBs[name];

    if (!IconComponent) {
      return <IconsFa.FaBeer style={{ color: iconColor && iconColor }} />;
    }

    return (
      <IconComponent
        className={style}
        style={{ color: iconColor && iconColor }}
      />
    );
  } else if (type === "Ri") {
    const IconComponent = IconsRi[name];

    if (!IconComponent) {
      return <IconsFa.FaBeer style={{ color: iconColor && iconColor }} />;
    }

    return (
      <IconComponent
        className={style}
        style={{ color: iconColor && iconColor }}
      />
    );
  } else if (type === "Ci") {
    const IconComponent = IconsCi[name];

    if (!IconComponent) {
      return <IconsFa.FaBeer style={{ color: iconColor && iconColor }} />;
    }

    return (
      <IconComponent
        className={style}
        style={{ color: iconColor && iconColor }}
      />
    );
  } else {
    const IconComponent = IconsVsc[name];

    if (!IconComponent) {
      return <IconsFa.FaBeer style={{ color: iconColor && iconColor }} />;
    }

    return;
  }
};

export default DynamicIcons;
