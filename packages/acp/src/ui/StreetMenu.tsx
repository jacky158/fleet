import { MuiIcon } from "@ikx/mui";
import { Link } from "@ikx/router";
import type { MenuItemShape } from "@ikx/types";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import Menu from "@mui/material/Menu";
import styled from "@mui/material/styles/styled";
import { floor } from "lodash";
import debounce from "lodash/debounce";
import React, {
  CSSProperties,
  ElementType,
  FC,
  ForwardRefExoticComponent,
  ForwardedRef,
  RefAttributes,
  RefObject,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export interface MoreButtonProps {
  onClick: () => void;
}

export type ItemProps = {
  item: MenuItemShape;
  activeTab?: string;
  visible?: boolean;
  closeMenu?: () => void;
};

export type StackMenuProps = {
  activeTab: string;
  items: MenuItemShape[];
  menuItem?: FC<ItemProps>;
  popoverMenuItem?: FC<ItemProps>;
  container?: ElementType;
  threshold?: number;
  divider?: null | ElementType;
  moreButton?: ForwardRefExoticComponent<
    MoreButtonProps & RefAttributes<HTMLButtonElement>
  >;
};

const PopoverMenuItemHolder = ({ item, activeTab }: ItemProps) => {
  const { to, label } = item;
  const selected = activeTab === to;

  return (
    <Link component={ListItemButton} to={to} selected={selected}>
      {label}
    </Link>
  );
};

function useBoundingSizeObserver(
  ref: RefObject<HTMLElement>,
  cb?: (size: { width: number; height: number }) => void
): { width: number; height: number } {
  const [sized, setSized] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  useEffect((): (() => void) | void => {
    function onResize() {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const cur: { width: number; height: number } = {
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      };

      if (sized.width != cur.width || sized.height !== cur.height) {
        setSized(cur);
        if (cb) cb(cur);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }

    const bounce = debounce(onResize, 100, { leading: true });

    if ("object" === typeof window) {
      window.addEventListener("resize", bounce);

      onResize();

      return () => {
        window.removeEventListener("resize", bounce);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);

  return sized;
}

const styles: [CSSProperties, CSSProperties] = [
  {
    opacity: 0,
    transition: "opacity 350ms",
  },
  { opacity: 1, transition: "opacity 350ms" },
];

const MenuItemHolder = ({ item, activeTab, visible }: ItemProps) => {
  const { to, label } = item;
  const active = activeTab === to;

  return (
    <Link
      component={Button}
      to={to}
      size="small"
      variant="text"
      style={styles[visible ? 1 : 0]}
      sx={{
        //textDecoration: active ? "underline" : "none",
        fontWeight: active ? "bold" : "normal",
      }}
    >
      {label}
    </Link>
  );
};

function useResizeIndex(
  ref: RefObject<HTMLDivElement>,
  hasDivider: boolean = true,
  threshold: number
): number {
  const widths = useRef<number[]>([]);
  const size = useBoundingSizeObserver(ref);
  const maxWidth = size.width - threshold;
  const cc = ref.current?.children;
  const resizeIndex = useMemo(() => {
    // calculate when mount or need reset (index === -1)

    if (!cc?.length) return -1;

    for (let i = 0; i < cc.length; i++) {
      const cw = cc[i].getBoundingClientRect().width;
      widths.current[i] = cw;
    }

    let width: number = 0;
    let index: number = 0;

    for (let i = 0; i < widths.current.length; ++i) {
      if (width + widths.current[i] > maxWidth) break;
      width += widths.current[i];
      index = i;
    }

    return index;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cc, maxWidth]);

  console.log(cc, maxWidth);

  return hasDivider ? floor(resizeIndex / 2) : resizeIndex;
}

const ContainerHolder = styled("div", {
  name: "AutoCompactMenu",
  slot: "Root",
  overridesResolver(_, styles) {
    return [styles.root];
  },
})({
  flex: 1,
  display: "flex",
  flexGrow: 1,
  overflow: "hidden",
  alignItems: "center",
  // justifyContent: "flex-end",
  flexWrap: "wrap",
});

function NullDivider() {
  return null as unknown as Element;
}

const DefaultMoreButton = React.forwardRef(
  (props: MoreButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    return (
      <IconButton size="small" ref={ref} {...props}>
        <MuiIcon name="more_vert" />
      </IconButton>
    );
  }
);
function StreetMenuBase({
  items,
  activeTab,
  menuItem: MenuItem = MenuItemHolder,
  popoverMenuItem: PopoverMenuItem = PopoverMenuItemHolder,
  moreButton: MoreButtonHolder = DefaultMoreButton,
  container: Container = ContainerHolder as ElementType,
  divider: MyDivider = NullDivider as unknown as ElementType,
  threshold = 50,
}: StackMenuProps) {
  const [open, setOpen] = useState<boolean>(false);
  const btnMoreRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const resizeIndex = useResizeIndex(rootRef, Boolean(NullDivider), threshold);

  const toggleOpen = useCallback(() => setOpen((prev: boolean) => !prev), []);
  const closeMenu = useCallback(() => setOpen(false), []);

  if (!items?.length) return null;

  const hasPopover = resizeIndex > -1 && resizeIndex < items?.length - 1;

  return (
    <>
      <Container ref={rootRef}>
        {items.map((item, index) => {
          const hidden = resizeIndex > -1 && index > resizeIndex;

          if (hidden) return null;

          return (
            <React.Fragment key={`_d.${index}`}>
              {index > 0 && MyDivider ? <MyDivider /> : null}
              <MenuItem
                item={item}
                activeTab={activeTab}
                visible={index <= resizeIndex}
              />
            </React.Fragment>
          );
        })}
        {hasPopover ? (
          <>
            {MyDivider ? <MyDivider /> : null}
            <MoreButtonHolder ref={btnMoreRef} onClick={toggleOpen} />
          </>
        ) : null}
      </Container>
      <Menu
        open={Boolean(open && btnMoreRef.current && -1 < resizeIndex)}
        anchorEl={btnMoreRef.current}
        onClick={closeMenu}
        onClose={closeMenu}
        style={{
          zIndex: 1200,
        }}
      >
        {items.slice(resizeIndex + 1).map((item, index) => (
          <PopoverMenuItem
            item={item}
            activeTab={activeTab}
            closeMenu={closeMenu}
            key={index.toString()}
          />
        ))}
      </Menu>
    </>
  );
}

const StreetMenu = memo<StackMenuProps>(
  StreetMenuBase,
  (prev: StackMenuProps, next: StackMenuProps) => next.items === prev.items
);

export default StreetMenu;
