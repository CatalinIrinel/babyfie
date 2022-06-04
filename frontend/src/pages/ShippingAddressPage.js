import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import CheckoutSteps from '../components/CheckoutSteps';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';

export default function ShippingAddressPage() {
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/shipping');
    }
  }, [userInfo, navigate]);
  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress.country || '');

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    });
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );
    navigate('/payment');
  };
  return (
    <Box mx="3rem" my="4rem">
      <Helmet>
        <title>Shipping Adress</title>
      </Helmet>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <Box
        display={'flex'}
        alignItems={'center'}
        flexDirection={'column'}
        mt="5"
      >
        <Heading as="h1" my="3">
          Shipping Adress
        </Heading>
        <form onSubmit={submitHandler}>
          <FormControl w={['300px', '500px']}>
            <FormLabel htmlFor="fullName">Full Name</FormLabel>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </FormControl>
          <FormControl w={['300px', '500px']}>
            <FormLabel htmlFor="address">Address</FormLabel>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </FormControl>
          <FormControl w={['300px', '500px']}>
            <FormLabel htmlFor="city">City</FormLabel>
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </FormControl>
          <FormControl w={['300px', '500px']}>
            <FormLabel htmlFor="postalCode">Postal Code</FormLabel>
            <Input
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </FormControl>
          <FormControl w={['300px', '500px']}>
            <FormLabel htmlFor="country">Country</FormLabel>
            <Input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </FormControl>
          <Box mt="3">
            <Button bg={'brand.500'} variant="solid" type="submit">
              Continue
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
