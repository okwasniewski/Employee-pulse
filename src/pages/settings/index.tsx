import Head from 'next/head';
import { TrashIcon } from '@heroicons/react/outline';
import withAnimation from '../../shared/HOC/withAnimation';
import Header from 'src/shared/components/Header/Header';
import withProtectedRoute from 'src/shared/HOC/withProtectedRoute';
import IconButton, {
  IconButtonVariant,
} from 'src/shared/components/IconButton/IconButton';
import Button, { ButtonVariant } from 'src/shared/components/Button/Button';
import { useSettingsManager } from 'src/features/settings/settingsManager';
import StyledDialog from 'src/shared/components/StyledDialog/StyledDialog';

function SettingsPage() {
  const {
    user,
    loading,
    isOpen,
    openDeleteModal,
    closeDeleteModal,
    handleOnAccountDelete,
  } = useSettingsManager();

  return (
    <>
      <Head>
        <title>Settings</title>
        <meta name="description" content="Settings - Employee Pulse" />
      </Head>
      <div className="container m-auto px-4 text-center md:px-8">
        <Header>Hi {user?.displayName}!</Header>
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="flex w-full md:ml-2 md:w-auto">
            <IconButton
              variant={IconButtonVariant.DANGER}
              title="Delete my account"
              className="mt-2 ml-2 w-full justify-center px-3 sm:mt-0 md:w-auto"
              onClick={openDeleteModal}
              icon={<TrashIcon className="h-5 w-5" />}
            >
              Delete my account
            </IconButton>
          </div>
        </div>
        <StyledDialog
          isOpen={isOpen}
          onClose={closeDeleteModal}
          title="Delete my account"
          content={
            <>
              <div className="mt-2">
                <p className="text-sm text-red-500">
                  Are you sure you want to&nbsp;
                  <span className="font-bold">delete</span> your account?
                </p>
              </div>
              <div className="mt-6 flex justify-between space-x-3">
                <Button
                  variant={ButtonVariant.SECONDARY}
                  onClick={closeDeleteModal}
                  className="uppercase"
                >
                  Cancel
                </Button>
                <IconButton
                  variant={IconButtonVariant.DANGER}
                  onClick={handleOnAccountDelete}
                  icon={<TrashIcon className="h-5 w-5" />}
                  className="uppercase"
                >
                  Confirm
                </IconButton>
              </div>
            </>
          }
        />
        {loading && (
          <div className="text-center text-sm text-zinc-600">Loading...</div>
        )}
      </div>
    </>
  );
}

export default withProtectedRoute(withAnimation(SettingsPage));