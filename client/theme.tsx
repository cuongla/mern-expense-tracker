import { createMuiTheme } from '@material-ui/core/styles'
  ;

declare module "@material-ui/core/styles/createPalette" {
  interface PaletteOptions {
    openTitle?: string
    protectedTitle?: string
  }
  interface Palette {
    openTitle?: string
    protectedTitle?: string
  }
}

declare module '@material-ui/core/styles/createTypography' {
  interface TypographyOptions {
    useNextVariants: boolean
  }
}

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: '#4f83cc',
      main: '#01579b',
      dark: '#002f6c',
      contrastText: '#fff',
    },
    secondary: {
      light: '#9fffe0',
      main: '#69f0ae',
      dark: '#2bbd7e',
      contrastText: '#000',
    },
    openTitle: '#002f6c',
    protectedTitle: '#2bbd7e',
    type: 'light'
  }
})

export default theme;