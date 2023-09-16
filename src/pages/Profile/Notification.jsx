import React, { useState } from 'react';
import Header from './Header';
import Typography from '../../components/shared/Typography';
import NotificationCheckBoxGroup from './NotificationCheckBoxGroup';
import Button from '../../components/ui/Buttons';

const Notification = () => {
  const [notificationStatus, setNotificationStatus] = useState({
    news: {
      email: false,
      browser: false,
      app: false,
    },
    accountActivity: {
      email: false,
      browser: false,
      app: false,
    },
    signIn: {
      email: false,
      browser: false,
      app: false,
    },
    Reminders: {
      email: false,
      browser: false,
      app: false,
    },
  });

  const changeNewsEmail = () => {
    setNotificationStatus({
      ...notificationStatus,
      news: {
        ...notificationStatus.news,
        email: !notificationStatus.news.email,
      },
    });
  };

  const changeNewsBrowser = () => {
    setNotificationStatus({
      ...notificationStatus,
      news: {
        ...notificationStatus.news,
        browser: !notificationStatus.news.browser,
      },
    });
  };

  const changeNewsApp = () => {
    setNotificationStatus({
      ...notificationStatus,
      news: {
        ...notificationStatus.news,
        app: !notificationStatus.news.app,
      },
    });
  };

  // activity
  const changeActivityEmail = () => {
    setNotificationStatus({
      ...notificationStatus,
      accountActivity: {
        ...notificationStatus.accountActivity,
        email: !notificationStatus.accountActivity.email,
      },
    });
  };

  const changeActivityBrowser = () => {
    setNotificationStatus({
      ...notificationStatus,
      accountActivity: {
        ...notificationStatus.accountActivity,
        browser: !notificationStatus.accountActivity.browser,
      },
    });
  };

  const changeActivityApp = () => {
    setNotificationStatus({
      ...notificationStatus,
      accountActivity: {
        ...notificationStatus.accountActivity,
        app: !notificationStatus.accountActivity.app,
      },
    });
  };

  // signIn
  const changeSignInEmail = () => {
    setNotificationStatus({
      ...notificationStatus,
      signIn: {
        ...notificationStatus.signIn,
        email: !notificationStatus.signIn.email,
      },
    });
  };

  const changeSignInBrowser = () => {
    setNotificationStatus({
      ...notificationStatus,
      signIn: {
        ...notificationStatus.signIn,
        browser: !notificationStatus.signIn.browser,
      },
    });
  };

  const changeSignInApp = () => {
    setNotificationStatus({
      ...notificationStatus,
      signIn: {
        ...notificationStatus.signIn,
        app: !notificationStatus.signIn.app,
      },
    });
  };

  // Reminders
  const changeRemindersEmail = () => {
    setNotificationStatus({
      ...notificationStatus,
      Reminders: {
        ...notificationStatus.Reminders,
        email: !notificationStatus.Reminders.email,
      },
    });
  };

  const changeRemindersBrowser = () => {
    setNotificationStatus({
      ...notificationStatus,
      Reminders: {
        ...notificationStatus.Reminders,
        browser: !notificationStatus.Reminders.browser,
      },
    });
  };

  const changeRemindersApp = () => {
    setNotificationStatus({
      ...notificationStatus,
      Reminders: {
        ...notificationStatus.Reminders,
        app: !notificationStatus.Reminders.app,
      },
    });
  };

  return (
    <div className="p-10">
      <Header />

      <div className="p-5 flex flex-col w-full !mb-[100px]">
        <Typography variant="P_SemiBold_H5" className="dark:text-white_">
          General Notification
        </Typography>
        <Typography variant="P_Regular_H7" className="text-text_light">
          Select how you'll be notified when the following changes occur.
        </Typography>

        <div className="flex w-full justify-between items-center pb-6 border-b-[2px] border-mid_dark_ dark:border-dark_border mt-10">
          <div className="flex w-[80%] justify-between items-center">
            <Typography variant="P_SemiBold_H6" className="text-text_light">
              News
            </Typography>

            <div className="w-[60%] flex items-center">
              <NotificationCheckBoxGroup
                email={notificationStatus.news.email}
                setEmail={changeNewsEmail}
                browser={notificationStatus.news.browser}
                setBrowser={changeNewsBrowser}
                app={notificationStatus.news.app}
                setApp={changeNewsApp}
              />
            </div>
          </div>
        </div>

        <div className="flex w-full justify-between items-center pb-6 border-b-[2px] border-mid_dark_ dark:border-dark_border mt-6">
          <div className="flex w-[80%] justify-between items-center">
            <Typography variant="P_SemiBold_H6" className="text-text_light">
              Account activity
            </Typography>

            <div className="w-[60%] flex items-center">
              <NotificationCheckBoxGroup
                email={notificationStatus.accountActivity.email}
                setEmail={changeActivityEmail}
                browser={notificationStatus.accountActivity.browser}
                setBrowser={changeActivityBrowser}
                app={notificationStatus.accountActivity.app}
                setApp={changeActivityApp}
              />
            </div>
          </div>
        </div>

        <div className="flex w-full justify-between items-center pb-6 border-b-[2px] border-mid_dark_ dark:border-dark_border mt-6">
          <div className="flex w-[80%] justify-between items-center">
            <Typography variant="P_SemiBold_H6" className="text-text_light">
              New device used to sign in
            </Typography>

            <div className="w-[60%] flex items-center">
              <NotificationCheckBoxGroup
                email={notificationStatus.signIn.email}
                setEmail={changeSignInEmail}
                browser={notificationStatus.signIn.browser}
                setBrowser={changeSignInBrowser}
                app={notificationStatus.signIn.app}
                setApp={changeSignInApp}
              />
            </div>
          </div>
        </div>

        <div className="flex w-full justify-between items-center pb-6 mt-6">
          <div className="flex w-[80%] justify-between items-center">
            <Typography variant="P_SemiBold_H6" className="text-text_light">
              Reminders
            </Typography>

            <div className="w-[60%] flex items-center">
              <NotificationCheckBoxGroup
                email={notificationStatus.Reminders.email}
                setEmail={changeRemindersEmail}
                browser={notificationStatus.Reminders.browser}
                setBrowser={changeRemindersBrowser}
                app={notificationStatus.Reminders.app}
                setApp={changeRemindersApp}
              />
            </div>
          </div>
        </div>

        <div className="gap-x-3 w-full justify-end flex mt-10">
          <Button
            className="ltr:mr-2 rtl:ml-2"
            type="button"
          >
            Reset
          </Button>
          <Button variant="solid" type="submit">
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
