--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Debian 14.5-1.pgdg110+1)
-- Dumped by pg_dump version 14.5 (Debian 14.5-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: update_timestamp(); Type: FUNCTION; Schema: public; Owner: iceberguser
--

CREATE FUNCTION public.update_timestamp() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_timestamp() OWNER TO iceberguser;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: iceberguser
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone
);


ALTER TABLE public.categories OWNER TO iceberguser;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: iceberguser
--

ALTER TABLE public.categories ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: comments; Type: TABLE; Schema: public; Owner: iceberguser
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    post_id integer,
    user_id integer,
    content character varying NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);


ALTER TABLE public.comments OWNER TO iceberguser;

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: iceberguser
--

ALTER TABLE public.comments ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: posts; Type: TABLE; Schema: public; Owner: iceberguser
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    user_id integer,
    title character varying,
    content character varying,
    category_id integer,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);


ALTER TABLE public.posts OWNER TO iceberguser;

--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: iceberguser
--

ALTER TABLE public.posts ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.posts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: roles; Type: TABLE; Schema: public; Owner: iceberguser
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.roles OWNER TO iceberguser;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: iceberguser
--

ALTER TABLE public.roles ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: iceberguser
--

CREATE TABLE public.sessions (
    session_id character varying DEFAULT md5((random())::text),
    user_id integer,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.sessions OWNER TO iceberguser;

--
-- Name: users; Type: TABLE; Schema: public; Owner: iceberguser
--

CREATE TABLE public.users (
    id integer NOT NULL,
    full_name text NOT NULL,
    username character varying,
    email character varying NOT NULL,
    password character varying NOT NULL,
    salt character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone,
    role integer DEFAULT 2,
    deleted_at timestamp with time zone
);


ALTER TABLE public.users OWNER TO iceberguser;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: iceberguser
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: iceberguser
--

COPY public.categories (id, name, created_at, updated_at) FROM stdin;
1	Artificial Intelligence	2024-01-24 12:47:20.612237+00	\N
2	Business	2024-01-24 12:47:20.612237+00	\N
3	Money	2024-01-24 12:47:20.612237+00	\N
4	Technology	2024-01-24 12:47:20.612237+00	\N
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: iceberguser
--

COPY public.comments (id, post_id, user_id, content, created_at, updated_at, deleted_at) FROM stdin;
1	1	15	updated content	2024-01-24 19:03:43.249711+00	2024-01-24 19:23:03.301094+00	2024-01-24 19:23:03.301094+00
3	1	16	updated content	2024-01-24 20:03:56.205832+00	2024-01-25 08:25:12.834102+00	2024-01-25 08:25:12.834102+00
4	1	16	Test comment lorem ipsum123	2024-01-24 20:20:26.764546+00	2024-01-25 08:25:12.834102+00	2024-01-25 08:25:12.834102+00
5	1	16	updated content	2024-01-24 20:20:28.846891+00	2024-01-25 08:25:12.834102+00	2024-01-25 08:25:12.834102+00
6	7	16	Test comment lorem ipsum123	2024-01-25 08:23:42.50746+00	2024-01-25 08:25:12.834102+00	2024-01-25 08:25:12.834102+00
7	7	16	Test comment lorem ipsum123	2024-01-25 08:23:43.114427+00	2024-01-25 08:25:12.834102+00	2024-01-25 08:25:12.834102+00
8	7	16	Test comment lorem ipsum123	2024-01-25 08:23:58.636753+00	2024-01-25 08:25:12.834102+00	2024-01-25 08:25:12.834102+00
9	7	16	Test comment lorem ipsum123	2024-01-25 08:23:59.4405+00	2024-01-25 08:25:12.834102+00	2024-01-25 08:25:12.834102+00
2	1	15	Test comment lorem ipsum123	2024-01-24 19:03:58.254806+00	2024-01-25 08:31:57.864183+00	2024-01-25 08:31:57.864183+00
10	7	15	Test comment lorem ipsum123	2024-01-25 08:52:39.510305+00	2024-01-25 08:52:39.510305+00	\N
11	8	29	Test comment lorem ipsum123	2024-01-26 08:20:57.207169+00	2024-01-26 08:20:57.207169+00	\N
12	8	29	Test comment lorem ipsum123	2024-01-26 08:20:58.196659+00	2024-01-26 08:20:58.196659+00	\N
13	8	31	Test comment lorem ipsum123	2024-01-26 08:21:24.741815+00	2024-01-26 08:21:24.741815+00	\N
14	8	31	Test comment lorem ipsum123	2024-01-26 08:21:25.189403+00	2024-01-26 08:21:25.189403+00	\N
15	8	31	Test comment lorem ipsum123	2024-01-26 08:21:25.783945+00	2024-01-26 08:21:25.783945+00	\N
16	8	31	Test comment lorem ipsum123	2024-01-26 08:21:26.31153+00	2024-01-26 08:21:26.31153+00	\N
17	8	31	Test comment lorem ipsum123	2024-01-26 08:21:26.766746+00	2024-01-26 08:21:26.766746+00	\N
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: iceberguser
--

COPY public.posts (id, user_id, title, content, category_id, created_at, updated_at, deleted_at) FROM stdin;
2	15	Title1	Lorem ipsum dolor sit amet..	1	2024-01-24 15:50:12.365036+00	\N	\N
1	15	Title2	Lorem ipsum dolor sit ametasdasd..	1	2024-01-24 15:49:24.052185+00	\N	\N
4	16	Title1	Lorem ipsum dolor sit amet..	1	2024-01-24 20:03:32.14493+00	\N	2024-01-25 08:25:12.834102+00
3	16	Title2	Lorem ipsum dolor sit ametasdasd..	1	2024-01-24 20:02:57.971368+00	\N	2024-01-25 08:25:12.834102+00
5	16	Title1	Lorem ipsum dolor sit amet..	1	2024-01-25 08:23:22.953543+00	\N	2024-01-25 08:25:12.834102+00
6	16	Title1	Lorem ipsum dolor sit amet..	1	2024-01-25 08:23:29.257579+00	\N	2024-01-25 08:25:12.834102+00
7	16	Title1	Lorem ipsum dolor sit amet..	1	2024-01-25 08:23:30.093679+00	\N	2024-01-25 08:25:12.834102+00
8	33	Title1	Lorem ipsum dolor sit amet..	1	2024-01-26 08:19:37.63076+00	\N	\N
9	33	Title2	Lorem ipsum dolor sit amet..	1	2024-01-26 08:19:43.99504+00	\N	\N
10	29	Title2	Lorem ipsum dolor sit amet..	1	2024-01-26 08:20:08.817224+00	\N	\N
11	29	Title Test	Lorem ipsum dolor sit amet..	1	2024-01-26 08:20:16.349058+00	\N	\N
12	29	Title Test	Lorem ipsum dolor sit amet..	1	2024-01-26 08:20:17.11961+00	\N	\N
13	31	Title Test	Lorem ipsum dolor sit amet..	2	2024-01-26 08:22:57.582173+00	\N	\N
14	31	Title Test	Lorem ipsum dolor sit amet..	2	2024-01-26 08:22:58.012014+00	\N	\N
15	31	Title Test	Lorem ipsum dolor sit amet..	3	2024-01-26 08:23:00.938442+00	\N	\N
16	31	Title Test	Lorem ipsum dolor sit amet..	3	2024-01-26 08:23:01.287739+00	\N	\N
17	31	Title Test	Lorem ipsum dolor sit amet..	3	2024-01-26 08:23:01.862101+00	\N	\N
18	31	Title Test	Lorem ipsum dolor sit amet..	4	2024-01-26 08:23:04.357097+00	\N	\N
19	31	Title Test	Lorem ipsum dolor sit amet..	4	2024-01-26 08:23:04.87061+00	\N	\N
20	31	Title Test	Lorem ipsum dolor sit amet..	4	2024-01-26 08:23:05.433783+00	\N	\N
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: iceberguser
--

COPY public.roles (id, name) FROM stdin;
1	Admin
2	User
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: iceberguser
--

COPY public.sessions (session_id, user_id, created_at) FROM stdin;
47aac3b230254d8e	30	2024-01-26 08:18:18.434142+00
5535bad3aedc2c0d	32	2024-01-26 08:18:29.299912+00
bf1f307dee5323c9	33	2024-01-26 08:18:38.9882+00
f8448f77209b7d1e	29	2024-01-26 08:18:08.973467+00
276472a1c5416b4e	31	2024-01-26 08:18:25.389428+00
81532cb3891ec244	15	2024-01-25 08:43:35.794209+00
637f1dfd12f50724	28	2024-01-26 08:16:13.421071+00
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: iceberguser
--

COPY public.users (id, full_name, username, email, password, salt, created_at, updated_at, role, deleted_at) FROM stdin;
32	User2	user232	user2@local.com	$2b$10$RYD2nphjkQlEktsPwf7l4ePlORFuvh4oYfcA5F1JXd299t/gyUFFS	$2b$10$RYD2nphjkQlEktsPwf7l4e	2024-01-26 08:18:29.289152	2024-01-26 08:18:29.289152	2	\N
33	Ali Kumbul	alikumbul22	ali_user@local.com	$2b$10$OhRfzQvW4qSEBCeL0na/.OvyONhdOtNWYyhnWHpc9I9NXj5x0vZjK	$2b$10$OhRfzQvW4qSEBCeL0na/.O	2024-01-26 08:18:38.973527	2024-01-26 08:19:30.926095	2	\N
16	Ali Kumbul	alikumbul15	alikumbul@local.com	$2b$10$mWoKCEc.HPVYLHUi64khH.1A10qpuwepIFAz7wzb9CN.qS5KVQVQq	$2b$10$mWoKCEc.HPVYLHUi64khH.	2024-01-24 14:10:12.859019	2024-01-25 08:25:12.834102	2	2024-01-25 08:25:12.834102+00
15	Admin	admin	admin@local.com	$2b$10$AFeqrGIEnSbvvMRL79xDXubetSwC9J9ZwqQQNfYjrQ4LY8QmYGfeq	$2b$10$AFeqrGIEnSbvvMRL79xDXu	2024-01-24 13:33:01.700872	2024-01-25 08:43:27.178312	1	\N
28	Ali Kumbul	alikumbul28	user5@local.com	$2b$10$8kZZN3sOWP0IdfJPHIhLD.pgozmHFNCKXAiJ7mWRY8QJ6gFBaS0yi	$2b$10$8kZZN3sOWP0IdfJPHIhLD.	2024-01-26 08:16:13.385229	2024-01-26 08:16:13.385229	2	\N
29	Ali Test	alitest29	ali_test@local.com	$2b$10$usR9f1oG/ODADSAzHYCYauZ0znGRWR898/5VbW1GdFcRVngGOQD2a	$2b$10$usR9f1oG/ODADSAzHYCYau	2024-01-26 08:18:08.954735	2024-01-26 08:18:08.954735	2	\N
30	Test User	testuser30	test_user@local.com	$2b$10$sT5ONHAVPd2X7NIKR/aeCe3Dm5JCAftV3o1ZfTjAlUhvX.G002IU6	$2b$10$sT5ONHAVPd2X7NIKR/aeCe	2024-01-26 08:18:18.42003	2024-01-26 08:18:18.42003	2	\N
31	User1	user131	user1@local.com	$2b$10$RovonQgPmp2dz5JTN0jrT.CjoaOxXkBMnedFeJ9aj0uTsqgG5fJMK	$2b$10$RovonQgPmp2dz5JTN0jrT.	2024-01-26 08:18:25.374342	2024-01-26 08:18:25.374342	2	\N
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: iceberguser
--

SELECT pg_catalog.setval('public.categories_id_seq', 8, true);


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: iceberguser
--

SELECT pg_catalog.setval('public.comments_id_seq', 17, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: iceberguser
--

SELECT pg_catalog.setval('public.posts_id_seq', 20, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: iceberguser
--

SELECT pg_catalog.setval('public.roles_id_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: iceberguser
--

SELECT pg_catalog.setval('public.users_id_seq', 33, true);


--
-- Name: categories categories_name_key; Type: CONSTRAINT; Schema: public; Owner: iceberguser
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key UNIQUE (name);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: iceberguser
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: iceberguser
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: iceberguser
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: iceberguser
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_session_id_key; Type: CONSTRAINT; Schema: public; Owner: iceberguser
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_session_id_key UNIQUE (session_id);


--
-- Name: sessions sessions_user_id_key; Type: CONSTRAINT; Schema: public; Owner: iceberguser
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_key UNIQUE (user_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: iceberguser
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: iceberguser
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: iceberguser
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: categories update_timestamp; Type: TRIGGER; Schema: public; Owner: iceberguser
--

CREATE TRIGGER update_timestamp BEFORE INSERT OR UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- Name: comments update_timestamp; Type: TRIGGER; Schema: public; Owner: iceberguser
--

CREATE TRIGGER update_timestamp BEFORE INSERT OR UPDATE ON public.comments FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- Name: users update_timestamp; Type: TRIGGER; Schema: public; Owner: iceberguser
--

CREATE TRIGGER update_timestamp BEFORE INSERT OR UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- Name: comments comments_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: iceberguser
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id);


--
-- Name: comments comments_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: iceberguser
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "comments_userId_fkey" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: posts posts_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: iceberguser
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- Name: posts posts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: iceberguser
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: iceberguser
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: users users_role_fkey; Type: FK CONSTRAINT; Schema: public; Owner: iceberguser
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_role_fkey FOREIGN KEY (role) REFERENCES public.roles(id);


--
-- PostgreSQL database dump complete
--

