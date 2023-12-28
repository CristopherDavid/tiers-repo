type AsyncCallbackType<T extends any[], R> = (...args: T) => Promise<R>;
type LaunchCallbackType = (
  rocketName: string,
  countdown: number
) => Promise<string>;

const launchRocket: LaunchCallbackType = async (rocketName, countdown) => {
  console.log(`Rocket ${rocketName} Countdown: ${countdown}s`);

  await new Promise((resolve) => setTimeout(resolve, countdown * 1000));

  console.log(`Rocket ${rocketName} Launched!`);
  return `Rocket ${rocketName} Launch Successful!`;
};

const asyncSetupWrapper = (
  callback: LaunchCallbackType
): LaunchCallbackType => {
  return async (rocketName, countdown) => {
    console.log("Async Setup: Preparing for Rocket Launch");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const result = await callback(rocketName, countdown);

    return result;
  };
};

const asyncCleanupWrapper = (
  callback: LaunchCallbackType
): LaunchCallbackType => {
  return async (rocketName, countdown) => {
    const result = await callback(rocketName, countdown);
    console.log("Async Cleanup: Clearing Launch Site");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return result;
  };
};

const wrappedRocketLaunch = asyncCleanupWrapper(
  asyncSetupWrapper(launchRocket)
);

wrappedRocketLaunch("Falcon 9", 5).then((result) => {
  console.log(result);
});
