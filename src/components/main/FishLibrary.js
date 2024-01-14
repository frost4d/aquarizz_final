import { useEffect, useState } from "react";
import {
  Box,
  GridItem,
  Grid,
  Card,
  CardBody,
  Text,
  CardHeader,
  Heading,
  CardFooter,
  Image,
  Flex,
  Button,
  MenuList,
  MenuItem,
  IconButton,
  SkeletonText,
  SkeletonCircle,
  Skeleton,
  MenuGroup,
  MenuDivider,
  Divider,
  MenuButton,
  Menu,
  AspectRatio,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";

// import { auth, db } from "../firebase/firebaseConfig";
import { auth, db } from "../../firebase/firebaseConfig";
import { Home, Compass, User, LogOut } from "react-feather";
import { useNavigate, Link } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
// import { UserAuth } from "./context/AuthContext";
import { UserAuth } from "../context/AuthContext";
import axios from 'axios';

const FishLibrary = () => {
    
  const [fishData, setFishData] = useState(null);

  const handleSignOut = () => {
    signOut(auth);
    navigate("/");
  };
  const navigate = useNavigate();
  const { user } = UserAuth();
  const cards = ["Card 1", "Card 2", "Card 3"];
  
  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://fish-species.p.rapidapi.com/fish_api/fishes',
        headers: {
          'X-RapidAPI-Key': 'e3cd78753fmshb1c3657acff34f0p1e18ccjsn4849685581f2',
          'X-RapidAPI-Host': 'fish-species.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setFishData(response.data);
        console.log(response.data);
        console.log(fishData);
        // console.log('Scientific Classification:', fishData[0]?.scientific_classification);

      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once, similar to componentDidMount

  return (
    <>
    {" "}
    <Flex
      className="navbar"
      justify="space-between"
      px="32px"
      py="12px"
      boxShadow="1px 0px 12px #aeaeae"
      w="100vw"
      overflow="hidden"
    >
      <Heading size="xl">Feed</Heading>
      <Flex>
        <Menu>
          <MenuButton
            as={IconButton}
            variant="outline"
            icon={<HamburgerIcon />}
          ></MenuButton>
          <MenuList>
            <MenuItem
              onClick={() => {
                navigate("/dashboard");
              }}
              icon={<Home size={16} />}
            >
              Home
            </MenuItem>
            <Link to="/discover">
              <MenuItem icon={<Compass size={16} />}>Discover</MenuItem>
            </Link>

            <MenuDivider />
            <MenuGroup title="Account">
              <MenuItem
                onClick={() => {
                  navigate(`/profile/${user.uid}`);
                }}
                icon={<User size={16} />}
              >
                Profile
              </MenuItem>
              <MenuItem icon={<LogOut size={16} />} onClick={handleSignOut}>
                Logout
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
    <Flex color="" justify="center" align="center">
      <Heading>Discover more here!</Heading>
    </Flex>
    <Flex justify="center" h="100vh" w="100vw" mt="56px">
      <Box w="100%">
        <Grid templateColumns="repeat(3, 1fr)" gap="14px">
          {/* dito mo ilagay yung card */}
          {Array.isArray(fishData) &&
            fishData.map((fish) => (
              <>
                <GridItem w="100%" key={fish.id}>
                  <Card h="100%" display="flex" flexDirection="column">
                    <CardHeader>
                    <Link to={fish.url} target="_blank" rel="noopener noreferrer">
                      <Button variant="link" color="#000">
                        {/* dito yung Name {fish.name} lagyan mo nalang ng onClick event tapos mapupunta sa link na clinick*/}
                        {fish.name}
                        Name
                      </Button>
                    </Link>
                    </CardHeader>
                    <CardBody flex="1">
                      <AspectRatio ratio={16 / 9} minHeight="300px" width="100%">
                      {/* dito yung image */}
                        <Image src={fish.img_src_set["1.5x"]} objectFit="cover"/>
                      </AspectRatio>

                      {/* <Image /> */}
                      <Text>
                        View a summary of all your customers over the last
                        month.
                      </Text>
                    </CardBody>
                    <CardFooter
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      flexDirection="column"
                    >
                      {/* dito yung mga scientific classifications */}

                      {/* {fish.scientific_classification && (
                        <Text fontSize="sm">{fish.scientific_classification}</Text>
                      )} */}

                    {fish.meta.scientific_classification && (
                          <>
                          <Flex flexDirection="column">
                          <Flex>                          
                            <Text fontSize="sm" fontWeight="bold" mr="2">Kingdom:</Text>
                            <Text fontSize="sm">{`${fish.meta.scientific_classification.kingdom}`}</Text>
                          </Flex>
                          <Flex>                          
                            <Text fontSize="sm" fontWeight="bold" mr="2">Phylum:</Text>
                            <Text fontSize="sm">{`${fish.meta.scientific_classification.phylum}`}</Text>
                          </Flex>
                          <Flex>
                            <Text fontSize="sm" fontWeight="bold" mr="2">Class:</Text>
                            <Text fontSize="sm">{`${fish.meta.scientific_classification.class}`}</Text>
                          </Flex>
                          <Flex>
                            <Text fontSize="sm" fontWeight="bold" mr="2">Order:</Text>
                            <Text fontSize="sm">{`${fish.meta.scientific_classification.order}`}</Text>
                          </Flex>
                          <Flex>
                            <Text fontSize="sm" fontWeight="bold" mr="2">Superfamily:</Text>
                            <Text fontSize="sm">{`${fish.meta.scientific_classification.superfamily}`}</Text>
                          </Flex>
                          <Flex>
                            <Text fontSize="sm" fontWeight="bold" mr="2">Family:</Text>
                            <Text fontSize="sm">{`${fish.meta.scientific_classification.family}`}</Text>
                          </Flex>
                          <Flex>
                            <Text fontSize="sm" fontWeight="bold" mr="2">Genus:</Text>
                            <Text fontSize="sm">{`${fish.meta.scientific_classification.genus}`}</Text>
                          </Flex>
                          <Flex>
                            <Text fontSize="sm" fontWeight="bold" mr="2">Type Species:</Text>
                            <Text fontSize="sm">{`${fish.meta.scientific_classification.type_species}`}</Text>
                          </Flex>
                          <Flex>
                            <Text fontSize="sm" fontWeight="bold" mr="2">Synonyms:</Text>
                            <Text fontSize="sm">{`${fish.meta.scientific_classification.synonyms}`}</Text>
                          </Flex>
                          </Flex>
                          </>
                        )}

                    </CardFooter>
                  </Card>
                </GridItem>
              </>
            ))}
        </Grid>
      </Box>
    </Flex>
  </>
  );
};

export default FishLibrary;