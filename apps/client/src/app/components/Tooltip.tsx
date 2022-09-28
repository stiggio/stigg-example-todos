import { styled, Tooltip, tooltipClasses, TooltipProps } from '@mui/material';

export const InformationTooltip = styled(
  ({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  )
)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'white',
    color: 'black',
    boxShadow: theme.shadows[8],
    padding: 8,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: 'white',
  },
}));
