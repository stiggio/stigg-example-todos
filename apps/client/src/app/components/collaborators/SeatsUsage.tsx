import { Button, LinearProgress, Typography } from '@mui/material';
import { Collaborator } from '../../types';
import { getUsagePercentage, getUsageProgressColor } from '../utils';

export function SeatsUsage({
  collaborators,
  onAddSeatsClick,
  collaboratorLimit,
  isUnlimitedCollaborators,
}: {
  collaborators: Collaborator[];
  onAddSeatsClick: () => void;
  collaboratorLimit: number;
  isUnlimitedCollaborators?: boolean;
}) {
  const usagePercentage = isUnlimitedCollaborators
    ? 0
    : getUsagePercentage(collaborators.length, collaboratorLimit);

  return (
    <>
      <Typography color="text.primary" component="span">
        {collaborators.length} /{' '}
        {isUnlimitedCollaborators ? 'unlimited' : collaboratorLimit} seats —
      </Typography>
      <Button sx={{ margin: 0 }} onClick={onAddSeatsClick}>
        Buy more
      </Button>
      <LinearProgress
        variant="determinate"
        value={usagePercentage}
        color={getUsageProgressColor(usagePercentage)}
      />
    </>
  );
}
