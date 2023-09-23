import React from 'react';

import { useNavigate } from 'react-router-dom';

// ** import third party library
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react';
import { HiOutlineLogout } from 'react-icons/hi';
import { Settings, User } from 'react-feather';
import { useSelector } from 'react-redux';
import { logout } from '@src/api/auth';
import dummyProfile from '@assets/Images/dummyProfile.png'

// ** import api essential

const UserDropDown = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userSlice.user);

  const signOut = async () => {
    await logout('/logout');
    localStorage.clear('userToken');
    navigate('/sign-in');
  };

  return (
    <Dropdown className="!rounded-[5px] dark:bg-light_dark_">
      <DropdownTrigger className="">
        <Button className="!bg-transparent">
          <img
            src={
              user?.avatar
                ? user?.avatar
                : dummyProfile
            }
            className="w-[40px] h-[40px] rounded-[50%]"
            alt=""
          />

          <div className="ml-2 leading-5">
            <p className="m-0 text-[14px] text-light_dark_ dark:text-text_dark font-inter text-left">
              {user?.role}
            </p>
            <p className="m-0 text-[16px] font-semibold text-light_dark_ dark:text-text_dark font-inter">
              {user?.name}
            </p>
          </div>
        </Button>
      </DropdownTrigger>
      <DropdownMenu className="" aria-label="Static Actions">
        <DropdownItem className="!bg-transparent mb-2 !cursor-default border-b-[2px] border-mid_dark_ dark:border-dark_border">
          <div className="py-2 px-3 flex items-center gap-2">
            <img
              src={
                user?.avatar
                  ? user?.avatar
                  : 'https://winaero.com/blog/wp-content/uploads/2015/05/windows-10-user-account-login-icon.png'
              }
              className="w-[40px] h-[40px] rounded-[50%]"
              alt=""
            />
            <div>
              <div className="font-bold text-gray-900 dark:text-gray-100">
                {user?.name}
              </div>
              <div className="text-xs dark:text-gray-100">{user?.email}</div>
            </div>
          </div>
        </DropdownItem>

        <DropdownItem
          onClick={() => navigate('/profile')}
          eventKey="Sign Out"
          className="gap-2 flex"
        >
          <div className="flex gap-2 dark dark:text-gray-100 items-center">
            <span className="text-xl opacity-50">
              <User size={15} />
            </span>
            <span>Profile</span>
          </div>
        </DropdownItem>
        <DropdownItem eventKey="Sign Out" className="gap-2 flex">
          <div className="flex gap-2 dark dark:text-gray-100 items-center">
            <span className="text-xl opacity-50">
              <Settings size={15} />
            </span>
            <span>Setting</span>
          </div>
        </DropdownItem>

        {/* <Dropdown.Item variant="divider" /> */}
        <DropdownItem
          onClick={signOut}
          eventKey="Sign Out"
          className="hover:!bg-transparent pt-2 mt-2 gap-2 flex border-t-[2px] border-mid_dark_ dark:border-dark_border"
        >
          <div className="flex gap-2 dark dark:text-gray-100 hover:text-light_dark_">
            <span className="text-xl opacity-50">
              <HiOutlineLogout />
            </span>
            <span>Sign Out</span>
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserDropDown;
