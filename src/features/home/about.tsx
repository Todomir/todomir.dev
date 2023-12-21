import { component$ } from "@builder.io/qwik";

import ImgMe from "~/media/images/me.jpg?jsx";

export default component$(() => {
  return (
    <section id="about" class="full-width bg-zinc-950 px-5 py-20 md:px-16 md:py-60">
      <div class="flex flex-col md:gap-20 lg:flex-row">
        <ImgMe class="ml-0 mt-10 max-h-[600px] w-full grow overflow-hidden rounded-lg object-cover object-center" />
        <div class="my-auto mt-10 flex max-w-full flex-col">
          <h2
            class="max-w-full text-4xl font-medium leading-[54px] tracking-tighter text-gray-100 md:text-5xl md:leading-[59px]"
            dangerouslySetInnerHTML={$localize`I believe in empowering <em class="font-serif italic">people</em>`}
          />
          <h3
            class="mt-6 max-w-full text-2xl leading-8 tracking-tight text-zinc-500"
            dangerouslySetInnerHTML={$localize`<span class="font-serif italic">People</span> are at the heart of any business. I develop software that brings <span class="font-serif italic">people</span> together and empowers them, all while bringing a smile to their faces.`}
          />
          <p class="mb-6 mt-12 max-w-full text-base leading-6 tracking-normal text-gray-100">
            {$localize`I'm Abner 👋, an innovative and passionate Web Developer with a flair for creating elegant solutions in the
            least amount of time.`}
          </p>
          <p>
            {$localize`With over 5 years of experience, I have crafted an array of dynamic and visually appealing web applications for diverse industries. Specialized in front-end development with extensive experience in creating high-impact, user-focused digital experiences.`}
          </p>
          <a
            href="mailto:abnerluis1001@gmail.com"
            target="_blank"
            rel="noreferrer"
            class="mt-12 max-w-full cursor-pointer whitespace-nowrap text-2xl leading-8 tracking-tight text-zinc-500 underline"
          >
            abnerluis1001@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
});
