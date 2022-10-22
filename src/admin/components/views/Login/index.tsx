import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { useConfig } from '../../utilities/Config';
import { useAuth } from '../../utilities/Auth';
import Logo from '../../graphics/Logo';
import MinimalTemplate from '../../templates/Minimal';
import Form from '../../forms/Form';
import Email from '../../forms/field-types/Email';
import Password from '../../forms/field-types/Password';
import FormSubmit from '../../forms/Submit';
import Button from '../../elements/Button';
import Meta from '../../utilities/Meta';

import './index.scss';

const baseClass = 'login';

const Login: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation('login');
  const { user, setToken } = useAuth();
  const {
    admin: {
      user: userSlug,
      components: {
        beforeLogin,
        afterLogin,
      } = {},
    },
    serverURL,
    routes: {
      admin,
      api,
    },
    collections,
  } = useConfig();

  const collection = collections.find(({ slug }) => slug === userSlug);

  const onSuccess = (data) => {
    if (data.token) {
      setToken(data.token);
      history.push(admin);
    }
  };

  if (user) {
    return (
      <MinimalTemplate className={baseClass}>
        <Meta
          title={t('login')}
          description={t('description')}
          keywords={t('login')}
        />
        <div className={`${baseClass}__wrap`}>
          <h1>{t('loggedInTitle')}</h1>
          <p>
            <Trans
              i18nKey="loggedIn"
              t={t}
            >
              <Link to={`${admin}/logout`}>log out</Link>
            </Trans>
          </p>
          <br />
          <Button
            el="link"
            buttonStyle="secondary"
            to={admin}
          >
            {t('backToDashboard')}
          </Button>
        </div>
      </MinimalTemplate>
    );
  }

  return (
    <MinimalTemplate className={baseClass}>
      <Meta
        title={t('login')}
        description={t('description')}
        keywords={t('login')}
      />
      <div className={`${baseClass}__brand`}>
        <Logo />
      </div>
      {Array.isArray(beforeLogin) && beforeLogin.map((Component, i) => <Component key={i} />)}
      {!collection.auth.disableLocalStrategy && (
        <Form
          disableSuccessStatus
          waitForAutocomplete
          onSuccess={onSuccess}
          method="post"
          action={`${serverURL}${api}/${userSlug}/login`}
        >
          <Email
            label={t('general:email')}
            name="email"
            admin={{ autoComplete: 'email' }}
            required
          />
          <Password
            label={t('general:password')}
            name="password"
            autoComplete="off"
            required
          />
          <Link to={`${admin}/forgot`}>
            {t('forgotPassword')}
          </Link>
          <FormSubmit>{t('login')}</FormSubmit>
        </Form>
      )}
      {Array.isArray(afterLogin) && afterLogin.map((Component, i) => <Component key={i} />)}
    </MinimalTemplate>
  );
};

export default Login;
