# ikx

ikx container

```txt
AppContainer
  IntlProvider
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider>
        <GlobalStyles />
        <RouteProvider routes={routes}>
          <HelmetHandler />
          <PopoverHandler />
          <ModalHandler />
          <MenuHandler />
          <ToastHandler />
          <FeedbackHandler />
          <AlertHandler />
          <ConfirmHandler />
          <Routes group="root" />
```

const app = useApp();

app.openPopover(evt, {component: AccountMenu})
app.openMenu(evt, {component: SelectFriendItem})
