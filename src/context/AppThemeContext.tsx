/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider
} from "@mui/material";
import { createContext, useContext, useMemo } from "react";
import type {} from "@mui/material/themeCssVarsAugmentation";

const AppThemeContext = createContext(null);

const AppThemeProvider = (props: any) => {
  const theme = useMemo(() => {
    return responsiveFontSizes(
      createTheme({
        cssVariables: {
          colorSchemeSelector: "class",
          disableCssColorScheme: true
        },
        palette: {
          primary: {
            main: `rgb(5, 99, 125)`,
            contrastText: "rgb(255, 255, 255)"
          },
          secondary: {
            main: `rgb(21, 153, 187)`,
            contrastText: "rgb(255, 255, 255)"
          }
        },
        colorSchemes: {
          light: {
            palette: {
              primary: {
                main: `rgb(5, 99, 125)`
              },
              secondary: {
                main: `rgb(21, 153, 187)`
              },
              background: {
                default: `#f0f7fa`,
                paper: `#ffffff`
              },
              text: {
                primary: `rgba(0, 0, 0, 0.87)`,
                secondary: `rgba(0, 0, 0, 0.6)`
              }
            }
          },
          dark: {
            palette: {
              primary: {
                main: `rgb(100, 181, 246)`
              },
              secondary: {
                main: `rgb(128, 222, 234)`
              },
              background: {
                default: `#121f2e`,
                paper: `#1e2a38`
              },
              text: {
                primary: `rgba(255, 255, 255, 0.87)`,
                secondary: `rgba(255, 255, 255, 0.6)`
              }
            }
          }
        }
      })
    );
  }, []);

  return (
    <AppThemeContext.Provider value={null}>
      <ThemeProvider theme={theme} disableTransitionOnChange>
        <CssBaseline enableColorScheme />
        {props.children}
      </ThemeProvider>
    </AppThemeContext.Provider>
  );
};

export const useAppThemeContext = () => useContext(AppThemeContext);

export default AppThemeProvider;
