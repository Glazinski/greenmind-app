import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  headline: {
    marginBottom: 25,
  },
  apiErrorContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 15,
  },
  textInput: {
    width: '100%',
  },
  footerContainer: {
    marginTop: 'auto',
  },
  footerButton: {
    height: 50,
  },
  footerLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerLinkButton: {
    textDecorationLine: 'underline',
  },
});
