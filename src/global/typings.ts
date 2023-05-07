// generic types
const returnWhatIPassIn = <T>(val: T) => {
  return val;
};

export const result = returnWhatIPassIn("string");

// omit and pick

type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

export type UserWithoutId = Omit<User, "id">;
export type UserWithOnlyEmail = Pick<User, "email">;

export const userLogin: UserWithoutId = {
  email: "sherasabin411@gmail.com",
  password: "Admin@12345",
  username: "sabin411",
};

/*
 * why should I use generic
 * question to ask:
 * 1. Are all elements known when i make the function
 */

interface Animal {
  name: string;
}

interface Human {
  firstName: string;
  lastName: string;
}

type DisplayName<TItem extends Animal | Human> = TItem extends Animal
  ? {
      animalName: string;
    }
  : { humanName: string };

const getDisplayName = <TItem extends Animal | Human>(
  item: TItem
): DisplayName<TItem> => {
  if ("name" in item) {
    return {
      animalName: item.name,
    } as DisplayName<TItem>;
  }
  return {
    humanName: `${item.firstName} ${item.lastName}`,
  } as DisplayName<TItem>;
};

export const result1 = getDisplayName({
  name: "Tiger",
});

export const result2 = getDisplayName({
  firstName: "sabin",
  lastName: "shrestha",
});

// REMOVE A member of Union type
export type letters = "a" | "b" | "c" | "d" | "e";
export type Remove<TType> = TType extends "c" | "e" | "d" | "b" ? never : TType;

export type WowWithoutC = Remove<letters>;

/*
 * Dynamic function arguments with GENERICS - Advanced TypeScript
 * Paila herxu ani aafai garxu
 * Hai ta yesma chai
 */

export type EventProp =
  | {
      type: "SIGN_OUT";
    }
  | {
      type: "LOGIN";
      payload: {
        email: string;
        password: string;
      };
    };

export const sendEvent = <TType extends EventProp["type"]>(
  ...args: Extract<EventProp, { type: TType }> extends {
    payload: infer TPayload;
  }
    ? [type: TType, payload: TPayload]
    : [type: TType]
) => {
  const [type, payload] = args;
  if (type === "LOGIN") {
    return payload;
  }
  return {
    message: "Logged out successfully",
  };
};

sendEvent("LOGIN", {
  email: "sherasabin411@gmail.com",
  password: "Admin@12345",
});
sendEvent("SIGN_OUT");

// noUncheckedIndexedAccess" - the BEST config option you've never heard of
export const myObj: Record<string, string[]> = {
  a: ["a", "b", "c"],
};

myObj.foo.push("baar");

/* Using DECLARE GLOBAL for amazing inference - Advanced TypeScript */
// skipped.

/* Decode search params with TYPESCRIPT ONLY - Advanced TypeScript */
export const getDeepValue = <
  Obj,
  FirstKey extends keyof Obj,
  secondKey extends keyof Obj[FirstKey]
>(
  obj: Obj,
  firstKey: FirstKey,
  second: secondKey
): Obj[FirstKey][secondKey] => {
  return {} as any;
};

const myObjWithObjs = {
  foo: {
    letter: "a",
    Value: "Arbind",
  },
  bar: {
    name: "b",
    lastname: 1,
  },
};

export const result3 = getDeepValue(myObjWithObjs, "bar", "name");
