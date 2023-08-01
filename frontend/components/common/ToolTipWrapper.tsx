import { Tooltip } from "@mui/material";

export const TooltipComp = (props: TooltipCompProps) => {
  const { label, children } = props;
  return (
    <Tooltip title={label} arrow enterDelay={1000} leaveDelay={1}>
      {children}
    </Tooltip>
  );
};

interface TooltipCompProps {
  label: string;
  children: React.ReactElement;
}
