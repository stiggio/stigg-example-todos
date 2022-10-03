import {
  BillingPeriod,
  BillingModel,
  Customer,
  EntitlementResetPeriod,
  PricingType,
} from '@stigg/react-sdk';
import { diffInDays } from '../utils';

export function getResetDateCopy(
  resetPeriod: EntitlementResetPeriod | null | undefined
): string {
  if (!resetPeriod) {
    return '';
  }
  switch (resetPeriod) {
    case EntitlementResetPeriod.Daily:
      return '/ day';
    case EntitlementResetPeriod.Hourly:
      return '/ hour';
    case EntitlementResetPeriod.Monthly:
      return '/ month';
    case EntitlementResetPeriod.Weekly:
      return '/ week';
  }
}

export function getPlanDetails(customer: Customer) {
  let isTrial = true;
  let subscription = customer.getActiveTrials()[0];
  if (!subscription) {
    isTrial = false;
    subscription = customer.getActiveSubscriptions()[0];
  }

  if (!subscription) {
    return null;
  }
  const daysLeft = diffInDays(subscription.trialEndDate);

  const plan = subscription?.plan;
  let planEntitlements = [
    ...(plan?.inheritedEntitlements || []),
    ...(plan?.entitlements || []),
  ];
  const planPrice = subscription.price;
  let planPriceEntitlement: string | undefined;
  if (planPrice?.feature) {
    const { unitQuantity, unitsPlural, displayName } = planPrice.feature;
    planEntitlements = planEntitlements.filter(
      (entitlement) => entitlement.feature.displayName !== displayName
    );
    planPriceEntitlement = `${unitQuantity} ${unitsPlural}`;
  }
  const isFreePlan = subscription.pricingType === PricingType.Free;
  const isCustomPricePlan = subscription.pricingType === PricingType.Custom;
  const priceValue = subscription.price?.amount;
  const priceString = isCustomPricePlan
    ? 'Custom price'
    : isFreePlan
    ? 'Free '
    : `$ ${priceValue} ${
        planPrice?.pricingModel === BillingModel.UsageBased
          ? `/ ${planPrice?.feature?.units || ''}`
          : planPrice?.billingPeriod === BillingPeriod.Monthly
          ? '/ month'
          : '/ year'
      }`;

  return {
    priceString,
    isTrial,
    isFreePlan,
    daysLeft,
    subscription,
    plan,
    planEntitlements,
    planPriceEntitlement,
  };
}
